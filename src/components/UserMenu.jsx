import { NavDropdown } from "react-bootstrap";
import { User, Heart, Package, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // your firebase config

function UserMenu() {

  const navigate = useNavigate();
const [userData, setUserData] = useState(
  JSON.parse(localStorage.getItem("user"))
);

const user=  JSON.parse(localStorage.getItem("user"))
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
const [formData, setFormData] = useState(userData);


  return (
    <>
    <NavDropdown.Item onClick={() => setShowProfile(true)}>
  <User size={16} className="me-2" />
  Profile
</NavDropdown.Item>
      <NavDropdown.Item onClick={() => navigate("/orders")}>
        <Package size={16} className="me-2" />
        My Orders
      </NavDropdown.Item>

      <NavDropdown.Item onClick={() => navigate("/wishlist")}>
        <Heart size={16} className="me-2" />
        Wishlist
      </NavDropdown.Item>

      <NavDropdown.Divider />

      <NavDropdown.Item onClick={handleLogout}>
        <LogOut size={16} className="me-2 text-danger" />
        Logout
      </NavDropdown.Item>

    <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>My Profile</Modal.Title>
  </Modal.Header>

  <Modal.Body className="text-center">

    {/* Avatar */}
    <div className="mb-3">
      <div className="profile-avatar">
        {user.name?.charAt(0)}
      </div>
    </div>

    {/* VIEW MODE */}
    {!editMode ? (
      <>
        <h5 className="fw-bold">{user.name}</h5>
        <p className="text-muted mb-1">{user.email}</p>
        <p className="text-muted">{user.phone || "No phone added"}</p>

        <Button
          variant="success"
          className="mt-3 w-100"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </Button>
      </>
    ) : (
      /* EDIT MODE */
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            className="w-50"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            className="w-50"
           onClick={async () => {
  try {
    const userRef = doc(db, "users", userData.uid); // 🔥 uid from Firebase auth

    await updateDoc(userRef, {
      name: formData.name,
      phone: formData.phone,
    });

    // ✅ update local state
    setUserData(formData);

    // ✅ update localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // ✅ close edit mode
    setEditMode(false);

    alert("Profile updated successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Update failed ❌");
  }
}}
          >
            Save
          </Button>
        </div>
      </Form>
    )}
  </Modal.Body>
</Modal>
    </>
  );
}

export default UserMenu;