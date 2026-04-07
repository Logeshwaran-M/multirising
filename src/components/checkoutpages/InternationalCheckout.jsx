import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useCart } from "../CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { auth } from "../../firebase";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckoutInternational() {
  const API_URL =
  window.location.hostname === "localhost"
    ? "https://multirising.vercel.app"
    : "https://multirising.vercel.app";

  const { cartItems, total,clearCart } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();
const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const buyNowProduct = location.state?.product;
  const productsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

  

  const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo",
  "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
  "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
  "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru",
  "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste",
  "Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
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

  const isFormValid = () => {
  return (
    data.firstName &&
    data.email &&
    data.phone &&
    data.addressLine1 &&
    data.city &&
    data.state &&
    data.country &&
    data.zipCode
  );
};

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
  setLoading(true); 
  
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
      shiprocket: {
    orderId: shipData.data?.order_id,
    shipmentId: shipData.data?.shipment_id,
    trackingNumber: shipData.data?.awb_code || "" // store AWB
  }
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
  finally {
    setLoading(false); // 🔥 STOP LOADING
  
  } 
};
const INR_TO_USD = 83; // approx
const usdAmount = (finalTotal / INR_TO_USD).toFixed(2);


const convertToUSD = (priceInINR) => {
  return priceInINR / INR_TO_USD; // ❗ no toFixed here
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

            <PayPalButtons
  style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
  className="mt-3"
   disabled={!isFormValid()}   // 🔥 THIS LINE FIXES IT
  createOrder={async (data, actions) => {
    // call backend to create PayPal order
    
    const res = await fetch("https://multirising-1.onrender.com/create-paypal-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: usdAmount, currency: "USD" }),
    });
    const order = await res.json();
    return order.id; // return order ID
  }}
onApprove={async (data) => {
  console.log("APPROVED DATA:", data);

  const res = await fetch(
    `https://multirising-1.onrender.com/capture-paypal-order/${data.orderID}`,
    { method: "POST" }
  );

  const captureData = await res.json();
  console.log("CAPTURE RESPONSE:", captureData);

  await handlePlaceOrder();
}}
  onError={(err) => {
    console.error("PayPal Error:", err);
    alert("Payment failed. Try again.");
  }}
/>

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
                  <small>${convertToUSD(item.price)} × {qty}</small>
                  </div>
                  <div className="ms-auto">
                   ${(convertToUSD(item.price) * qty).toFixed(2)}
                  </div>
                </div>
              );
            })}

            <hr/>
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${usdAmount}</strong>
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