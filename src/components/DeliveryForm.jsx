import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { FaTrash, FaSearch, FaCreditCard } from "react-icons/fa";

function DeliveryForm() {
  const { cartItems, removeItem, total } = useCart();

  // Expanded country list
  const countries = [
    "India", "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "UAE", "Japan", "China", "Brazil", "South Africa", "New Zealand", 
    "Singapore", "Italy", "Spain", "Russia", "Mexico"
  ];

  const [formData, setFormData] = useState({
    email: "",
    marketing: true,
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Karnataka",
    pinCode: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Saving Order Details:", formData);
    alert("Order details saved! Proceeding to payment gateway...");
  };

  return (
    <Container className="py-5">
      <Row className="gx-5">
        {/* LEFT COLUMN */}
        <Col lg={7}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">Contact</h4>
            <a href="#signin" className="text-decoration-underline text-dark small">Sign in</a>
          </div>

          <Form onSubmit={handlePayment}>
            <Form.Control 
              name="email"
              type="email" 
              placeholder="Email" 
              className="py-2 mb-3 shadow-sm border-info"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Check 
              name="marketing"
              type="checkbox" 
              label="Email me with news and offers" 
              className="small mb-4" 
              checked={formData.marketing}
              onChange={handleChange}
            />

            <h4 className="fw-bold mb-3">Delivery</h4>

            {/* Country Selector */}
            <Form.Select
              name="country"
              className="py-2 mb-3 shadow-sm"
              value={formData.country}
              onChange={handleChange}
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Form.Select>

            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="firstName"
                  placeholder="First Name"
                  className="py-2 shadow-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  name="lastName"
                  placeholder="Last Name"
                  className="py-2 shadow-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <InputGroup className="mb-3">
              <Form.Control
                name="address"
                placeholder="Address"
                className="py-2 shadow-sm"
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
              className="py-2 mb-3 shadow-sm"
              value={formData.apartment}
              onChange={handleChange}
            />

            <Row className="mb-3">
              <Col>
                <Form.Control
                  name="city"
                  placeholder="City"
                  className="py-2 shadow-sm"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Show state only if country is India */}
              {formData.country === "India" && (
                <Col>
                  <Form.Select
                    name="state"
                    className="py-2 shadow-sm"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Tamil Nadu</option>
                  </Form.Select>
                </Col>
              )}

              <Col>
                <Form.Control
                  name="pinCode"
                  placeholder="PIN code"
                  className="py-2 shadow-sm"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Form.Control
              name="phone"
              placeholder="Phone"
              className="py-2 mb-4 shadow-sm"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* PAY NOW BUTTON - Blue with Credit Card Icon */}
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mt-3"
              style={{ fontSize: '1.1rem' }}
            >
              <FaCreditCard size={16} /> Pay Now — ₹{total}
            </Button>
          </Form>
        </Col>

        {/* RIGHT COLUMN - Order Summary */}
        <Col lg={5} className="bg-light p-4 rounded-4 border shadow-sm h-100 sticky-top" style={{ top: '20px' }}>
          <h5 className="fw-bold mb-4">Order Summary</h5>
          <div className="cart-items-list mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex align-items-center mb-3">
                <div className="position-relative me-3 border rounded-3 bg-white p-1">
                  <img src={item.image} alt={item.name} width="64" height="64" className="rounded-2 object-fit-cover" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">{item.name}</div>
                  <div className="text-muted extra-small">Welcome Discount</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold small">₹{item.price}</div>
                  <Button variant="link" className="p-0 text-danger" onClick={() => removeItem(item.id)}><FaTrash size={12}/></Button>
                </div>
              </div>
            ))}
          </div>
          
          <hr />
          <div className="d-flex justify-content-between align-items-end pt-2">
            <div>
              <h5 className="fw-bold mb-0 text-uppercase" style={{letterSpacing: '1px'}}>Total</h5>
              <small className="text-muted">Incl. Taxes</small>
            </div>
            <div className="text-end">
              <span className="h4 fw-bold">₹{total}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeliveryForm;