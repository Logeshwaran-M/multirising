import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useCart } from "../CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { auth } from "../../firebase";

function CheckoutIndia() {
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

const handlePayment = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      return;
    }

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.pinCode
    ) {
      alert("Please fill all delivery address fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

 
    // 1️⃣ Create Razorpay order but don't wait for it completely
    const res = await fetch(
      "https://multirising-1.onrender.com/create-razorpay-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal, currency: "INR" }),
      }
    );
   const orderData = await res.json(); // now we have actual orderData
    if (!orderData?.id) {
      alert("Failed to create order");
      return;
    }

   // parse JSON but don't await yet

    // 2️⃣ Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: finalTotal * 100, // paise
      currency: "INR",
      name: "Multirising Exports",
      description: "Order Payment",
     order_id: orderData.id, // will update after promise resolves
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#28a745" },

      handler: async function (response) {
        try {
         

          // 3️⃣ Verify Razorpay payment
           

          // 4️⃣ Create Shiprocket order
          const shipRes = await fetch(
            "https://multirising-1.onrender.com/create-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address: formData,
                products: productsToShow,
                totalAmount: finalTotal,
              }),
            }
          );
          const shipData = await shipRes.json();

          if (!shipData.success) {
            alert("Order placed but shipping failed");
            return;
          }

          // 5️⃣ Send Order Email
          try {
            await fetch(`${API_URL}/api/send-order-email`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "India",
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData,
                products: productsToShow,
                total: finalTotal,
              }),
            });
          } catch (emailErr) {
            console.error("Failed to send order email:", emailErr);
          }
         console.log(shipData.data)
          // 6️⃣ Save everything in Firebase
          await placeOrder(user.uid, {
            orderType: "India",
            products: productsToShow,
            totalAmount: finalTotal,
            address: formData,
             shiprocket: shipData.data,
            paymentDetails: response,
          });

          // 7️⃣ Clear cart & show popup
          clearCart();
          setShowPopup(true);
        } catch (err) {
          console.error(err);
          alert("Something went wrong after payment");
        }
      },

      modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    // Update order_id once orderData resolves
  } catch (err) {
    console.error(err);
    alert("Payment failed. Try again.");
  }
};

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "Karnataka",
  pinCode: "",
  country: "India"
});

const handleTestPayment = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      return;
    }

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.pinCode
    ) {
      alert("Please fill all delivery address fields");
      return;
    }

    // Call Shiprocket directly (simulate successful payment)
    const shipRes = await fetch(
      "https://multirising-1.onrender.com/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: formData,
          products: productsToShow,
          totalAmount: finalTotal,
        }),
      }
    );

    const shipData = await shipRes.json();
    console.log("🚀 Shiprocket Response:", shipData);

    if (!shipData.success) {
      alert("Failed to create Shiprocket order");
      return;
    }

    // Save directly to Firebase (simulate payment success)
    await placeOrder(user.uid, {
      orderType: "India",
      products: productsToShow,
      totalAmount: finalTotal,
      address: formData,
      shiprocket: shipData.data,
      paymentDetails: { testPayment: true }, // mark it as test
    });

    setShowPopup(true);
  } catch (err) {
    console.error("Test payment failed:", err);
    alert("Test payment failed. Check console.");
  }
};

const indianStates = [
"Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
"Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
"Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
"Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
"Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh"
];

const handleChange = (e)=>{
const {name,value} = e.target;
setFormData({...formData,[name]:value});
};

const finalTotal = buyNowProduct
? buyNowProduct.price * (buyNowProduct.quantity || 1)
: total;

const handlePlaceOrder = async () => {

const user = auth.currentUser;

if(!user){
alert("Please login first");
return;
}
if(
!formData.firstName ||
!formData.email ||
!formData.phone ||
 !formData.addressLine1 ||
!formData.city ||
!formData.state ||
!formData.pinCode
){
alert("Please fill all delivery address fields");
return;
}

const orderData = {
orderType:"India",
products: productsToShow,
totalAmount: finalTotal,
address: formData,

};

// Send email after order placed
try {
  await fetch(`${API_URL}/api/send-order-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
       type: "India",
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData,
      products: productsToShow,
      total: finalTotal
    }),
  });
} catch (err) {
  console.error("Failed to send order email:", err);
}

await placeOrder(user.uid, orderData);

setShowPopup(true);

};

return(

<Container className="p-5 mt-5">

{/* Back Button */}

<div className="d-flex align-items-center mb-4">

<Button
variant="primary"
onClick={() => navigate(-1)}
className="shadow-sm"
style={{borderRadius:"50%",width:"45px",height:"45px"}}

>

<FaArrowLeft/>

</Button>

<h3 className="ms-3 mb-0 fw-bold">
Indian Checkout
</h3>

</div>

<Row>

{/* ADDRESS FORM */}

<Col md={7}>

<Card className="p-4 shadow-sm border-0 rounded-4">

<h5 className="mb-3 fw-semibold">
Delivery Address
</h5>

<Form>

<Row className="mb-3">

<Col>
<Form.Control
name="firstName"
placeholder="First Name"
onChange={handleChange}
/>
</Col>

<Col>
<Form.Control
name="lastName"
placeholder="Last Name"
onChange={handleChange}
/>
</Col>

</Row>

<Form.Control
className="mb-3"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<Form.Control
className="mb-3"
name="phone"
placeholder="Phone"
onChange={handleChange}
/>

<Form.Control
  className="mb-3"
  name="addressLine1"
  placeholder="Address Line 1"
  onChange={handleChange}
/>

<Form.Control
  className="mb-3"
  name="addressLine2"
  placeholder="Address Line 2"
  onChange={handleChange}
/>

<Form.Control
  className="mb-3"
  name="landmark"
  placeholder="Landmark"
  onChange={handleChange}
/>

<Row>

<Col>
<Form.Control
name="city"
placeholder="City"
onChange={handleChange}
/>
</Col>

<Col>

<Form.Select
name="state"
value={formData.state}
onChange={handleChange}

>

{indianStates.map((state,index)=>(

<option key={index}>{state}</option>
))}

</Form.Select>

</Col>

<Col>

<Form.Control
name="pinCode"
placeholder="Pin Code"
onChange={handleChange}
/>

</Col>

</Row>
<Button
  className="mt-4 w-100 fw-bold"
  variant="warning"
  size="lg"
  onClick={handleTestPayment}
>
  Test Shiprocket Order
</Button>

<Button
className="mt-4 w-100 fw-bold"
variant="success"
size="lg"
style={{borderRadius:"10px"}}
  onClick={handlePayment}

>

Pay ₹{finalTotal}

</Button>

</Form>

</Card>

</Col>

{/* ORDER SUMMARY */}

<Col md={5}>

<Card className="shadow-sm p-4 border-0 rounded-4">

<h5 className="mb-3 fw-semibold">
Order Summary
</h5>

{productsToShow.map(item => {

const quantity = item.quantity || 1;

return(

<div key={item.id} className="d-flex mb-3 align-items-center">

<img
src={item.image}
width={60}
height={60}
alt={item.name}
className="rounded"
/>

<div className="ms-3">

<h6 className="mb-1">{item.name}</h6>

<small className="text-muted">
₹{item.price} × {quantity}
</small>

</div>

<div className="ms-auto fw-bold">
₹{item.price * quantity}
</div>

</div>

);

})}

<hr/>

<div className="d-flex justify-content-between fw-bold fs-5">

<span>Total</span>

<span>₹{finalTotal}</span>

</div>

</Card>

</Col>

</Row>

{/* Success Popup */}

<Modal
show={showPopup}
onHide={() => setShowPopup(false)}
centered

>

<Modal.Header closeButton>
<Modal.Title>🎉 Order Placed Successfully</Modal.Title>
</Modal.Header>

<Modal.Body className="text-center">

<p>Your order has been placed successfully.</p>
</Modal.Body>

<Modal.Footer>

<Button
variant="secondary"
onClick={() => navigate("/products")}

>

Continue Shopping </Button>

<Button
variant="success"
onClick={() => navigate("/orders")}

>

Go to My Orders </Button>

</Modal.Footer>

</Modal>

</Container>

);

}

export default CheckoutIndia;  