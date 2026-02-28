import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { FaTrash, FaSearch, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();

  const [showIndianForm, setShowIndianForm] = useState(false);
  const [showInternationalForm, setShowInternationalForm] = useState(false);
const navigate=useNavigate()

   function handlenavigate(){
      navigate("/DeliveryForm")
   }
  const allStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh"
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "Karnataka",
    pinCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Order details saved! Proceeding to payment...");
    setShowIndianForm(false);
    setShowInternationalForm(false);
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-5">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty 😔</h4>
          <p>Looks like you haven’t added anything yet.</p>
          <Button variant="dark" href="/products" className="mt-3">Start Shopping</Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.map(item => (
              <Card key={item.id} className="mb-4 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} width={80} height={80} className="rounded-2"/>
                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-muted mb-1">₹{item.price}</p>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <Button size="sm" variant="outline-dark" onClick={() => decreaseQty(item.id)}>−</Button>
                      <span className="fw-bold">{item.quantity}</span>
                      <Button size="sm" variant="outline-dark" onClick={() => increaseQty(item.id)}>+</Button>
                    </div>
                  </div>
                  <div className="text-end me-3 fw-bold">₹{item.price * item.quantity}</div>
                  <Button variant="light" className="text-danger" onClick={() => removeItem(item.id)}><FaTrash /></Button>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <Card className="shadow-sm rounded-4 p-3">
              <Card.Body>
                <h5 className="fw-bold mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="d-flex justify-content-between mb-3"><span>Shipping</span><span className="text-success">Free</span></div>
                <hr/>
                <div className="d-flex justify-content-between mb-4"><span className="fw-bold">Total</span><span className="fw-bold fs-5">₹{total}</span></div>

                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => setShowIndianForm(true)}>🇮🇳 Checkout for Indian Address</Button>
                  <Button variant="info" onClick={handlenavigate}>🌍 Checkout for International Address</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Indian Checkout Modal */}
 <Modal show={showIndianForm} onHide={() => setShowIndianForm(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Indian Delivery Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Control
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Col>
        <Col>
          <Form.Control
            name="lastName"
            placeholder="Last Name (optional)"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Form.Control
        type="email"
        name="email"
        placeholder="Email"
        className="mb-3"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Form.Control
        name="phone"
        placeholder="Phone"
        className="mb-3"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <InputGroup className="mb-3">
        <Form.Control
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <InputGroup.Text className="bg-white border-start-0">
          <FaSearch className="text-muted" />
        </InputGroup.Text>
      </InputGroup>

      <Form.Control
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        className="mb-3"
        value={formData.apartment}
        onChange={handleChange}
      />

      <Row className="mb-3">
        <Col>
          <Form.Control
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Col>
        <Col>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            {allStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            name="pinCode"
            placeholder="PIN Code"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>

      {/* Pay Now Button */}
      <Button
        type="submit"
        variant="success"
        className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-2"
      >
        <FaCreditCard /> Pay Now — ₹{total}
      </Button>

      {/* Cash on Delivery Button */}
      <Button
        type="button"
        className="w-100 py-2 fw-bold d-flex bg-primary align-items-center justify-content-center gap-2"
        onClick={() => alert("Cash on Delivery selected! Your order will be processed.")}
      >
        💵 Cash on Delivery
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      {/* International Checkout Modal */}
  
    </Container>
  );
}

export default Cart;