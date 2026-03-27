import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useCart } from "../CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { auth } from "../../firebase";

function CheckoutInternational() {
  const API_URL =
  window.location.hostname === "localhost"
    ? "https://multirising.vercel.app"
    : "https://multirising.vercel.app";

  const { cartItems, total,clearCart } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const buyNowProduct = location.state?.product;
  const productsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

  

  const countries = [
    "United States","United Kingdom","Canada","Australia","Germany","France",
    "Italy","Spain","Netherlands","Sweden","Norway","Singapore","Malaysia",
    "Japan","China","South Korea","United Arab Emirates","Saudi Arabia",
    "South Africa","Brazil","Mexico","Russia","India"
  ];

  // ✅ STATE
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 📍 LOCATION AUTO FILL
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
        );

        const dataRes = await res.json();

        const components = dataRes.results[0].address_components;

        let city = "", state = "", country = "", zipCode = "";

        components.forEach((c) => {
          if (c.types.includes("locality")) city = c.long_name;
          if (c.types.includes("administrative_area_level_1")) state = c.long_name;
          if (c.types.includes("country")) country = c.long_name;
          if (c.types.includes("postal_code")) zipCode = c.long_name;
        });

        setData(prev => ({
          ...prev,
          city,
          state,
          country,
          zipCode
        }));

      } catch (err) {
        console.log(err);
        alert("Failed to fetch location");
      }
    });
  };

  const finalTotal = buyNowProduct
    ? buyNowProduct.price * (buyNowProduct.quantity || 1)
    : total;

 const handlePlaceOrder = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  if (
    !data.firstName ||
    !data.email ||
    !data.phone ||
    !data.addressLine1 ||
    !data.city ||
    !data.state ||
    !data.country ||
    !data.zipCode
  ) {
    alert("Please fill all fields");
    return;
  }

  const orderData = {
    orderType: "International",
    products: productsToShow,
    totalAmount: finalTotal,
    address: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      country: data.country,
      pinCode: data.zipCode
    }
  };

  try {
    // ✅ 1. CALL YOUR BACKEND (SHIPROCKET)
    const shipRes = await fetch("https://multirising-1.onrender.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    let shipData;
    try {
      shipData = await shipRes.json();
    } catch (err) {
      const text = await shipRes.text();
      console.error("Shiprocket HTML error:", text);
      alert("Server error");
      return;
    }

    // ❌ STOP IF SHIPROCKET FAILS
    if (!shipRes.ok || !shipData.success) {
      console.error("Shiprocket Failed:", shipData);
      alert("Shipping failed. Order not placed.");
      return;
    }

    // ✅ 2. SAVE ORDER (ONLY AFTER SUCCESS)
    await placeOrder(user.uid, {
      ...orderData,
      shiprocketOrderId: shipData.data?.order_id
    });

    // ✅ 3. SEND EMAIL
    await fetch(`${API_URL}/api/send-bulk-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "international",
        name: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        total: finalTotal,
        products: productsToShow.map(p => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity || 1
        })),
        address: {
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        },
        message: "International Order from Website"
      }),
    });

    // ✅ 4. CLEAR CART
    clearCart();

    // ✅ 5. SUCCESS UI
    setShowPopup(true);

    // ✅ 6. NAVIGATE
    navigate("/orders");

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <Container className="p-5 mt-5">

      {/* HEADER */}
      <div className="d-flex align-items-center mb-4">
        <Button
          onClick={() => navigate(-1)}
          style={{ borderRadius: "50%", width: "45px", height: "45px" }}
        >
          <FaArrowLeft />
        </Button>
        <h3 className="ms-3">🌍 International Checkout</h3>
      </div>

      <Row>

        {/* FORM */}
        <Col md={7}>
          <Card className="p-4 shadow-sm">

            <h5>Delivery Address</h5>

            <Form>

              <Row className="mb-3">
                <Col>
                  <Form.Control name="firstName" placeholder="First Name" onChange={handleChange}/>
                </Col>
                <Col>
                  <Form.Control name="lastName" placeholder="Last Name" onChange={handleChange}/>
                </Col>
              </Row>

              <Form.Control className="mb-3" name="email" placeholder="Email" onChange={handleChange}/>
              <Form.Control className="mb-3" name="phone" placeholder="Phone" onChange={handleChange}/>

              <Form.Control className="mb-3" name="addressLine1" placeholder="Street Address" onChange={handleChange}/>
              <Form.Control className="mb-3" name="addressLine2" placeholder="Apartment / Area" onChange={handleChange}/>
              <Form.Control className="mb-3" name="landmark" placeholder="Landmark" onChange={handleChange}/>

              {/* ROW 1 */}
              <Row className="mb-3">
                <Col>
                  <Form.Control name="city" placeholder="City" value={data.city} onChange={handleChange}/>
                </Col>
                <Col>
                  <Form.Control name="state" placeholder="State" value={data.state} onChange={handleChange}/>
                </Col>
              </Row>

              {/* ROW 2 */}
              <Row>
                <Col>
                  <Form.Select name="country" value={data.country} onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countries.map((c,i)=>(
                      <option key={i}>{c}</option>
                    ))}
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Control name="zipCode" placeholder="Zip Code" value={data.zipCode} onChange={handleChange}/>
                </Col>
              </Row>

              <Button
                className="mt-4 w-100"
                variant="success"
                onClick={handlePlaceOrder}
              >
                Pay ₹{finalTotal}
              </Button>

            </Form>

          </Card>
        </Col>

        {/* SUMMARY */}
        <Col md={5}>
          <Card className="p-4 shadow-sm">

            <h5>Order Summary</h5>

            {productsToShow.map(item => {
              const qty = item.quantity || 1;
              return (
                <div key={item.id} className="d-flex mb-3">
                  <img src={item.image} width={60} alt="" />
                  <div className="ms-3">
                    <h6>{item.name}</h6>
                    <small>₹{item.price} × {qty}</small>
                  </div>
                  <div className="ms-auto">
                    ₹{item.price * qty}
                  </div>
                </div>
              );
            })}

            <hr/>
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>₹{finalTotal}</strong>
            </div>

          </Card>
        </Col>

      </Row>

      {/* SUCCESS */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          🎉 Your order is successful!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>navigate("/products")}>Shop More</Button>
          <Button onClick={()=>navigate("/orders")}>My Orders</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default CheckoutInternational;