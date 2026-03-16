import { NavDropdown } from "react-bootstrap";
import { User, Heart, Package, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserMenu() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };
const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <NavDropdown.Item>
        <User size={16} className="me-2 text-center" />
        Profile
         <NavDropdown.ItemText className=" text-dark">
            <strong>{user.name}</strong>
            <br />
            <small>{user.email}</small>
          </NavDropdown.ItemText>
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
    </>
  );
}

export default UserMenu;