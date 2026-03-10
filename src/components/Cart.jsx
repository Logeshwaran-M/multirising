import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { FaTrash, FaSearch, FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

function Cart() {

const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();

const [showIndianForm, setShowIndianForm] = useState(false);
const [showInternationalForm, setShowInternationalForm] = useState(false);

/* ------------------ INDIAN FORM DATA ------------------ */

const allStates = [
"Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
"Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
"Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
"Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
"Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh"
];

const [formData, setFormData] = useState({
firstName:"",
lastName:"",
email:"",
phone:"",
address:"",
apartment:"",
city:"",
state:"Karnataka",
pinCode:""
});

/* ------------------ INTERNATIONAL FORM DATA ------------------ */

const countries = [
"United States","United Kingdom","Canada","Australia","Germany","France","Italy",
"Spain","Netherlands","Sweden","Norway","Singapore","Malaysia","Japan","China",
"South Korea","United Arab Emirates","Saudi Arabia","South Africa","Brazil",
"Mexico","Russia","India"
];

const [internationalData,setInternationalData]=useState({
firstName:"",
lastName:"",
email:"",
phone:"",
address:"",
city:"",
country:"",
zipCode:""
});

/* ------------------ FORM CHANGE ------------------ */

const handleChange=(e)=>{
const {name,value}=e.target;
setFormData(prev=>({...prev,[name]:value}));
};

/* ------------------ STRIPE PAYMENT ------------------ */

const handleStripePayment=async()=>{

const stripe=await stripePromise;

const response=await fetch("http://localhost:5000/create-stripe-session",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
amount:total,
customerData:internationalData
})
});

const session=await response.json();

await stripe.redirectToCheckout({sessionId:session.id});
};

/* ------------------ RAZORPAY PAYMENT ------------------ */

const handleRazorpayPayment=async()=>{

const response=await fetch("http://localhost:5000/create-razorpay-order",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({amount:total})
});

const order=await response.json();

const options={
key:"YOUR_RAZORPAY_KEY_ID",
amount:order.amount,
currency:order.currency,
order_id:order.id,

handler:function(){
alert("Payment Successful 🎉");
setShowIndianForm(false);
}
};

const rzp=new window.Razorpay(options);
rzp.open();
};

/* ------------------ UI ------------------ */

return(

<Container className="py-5">

<h2 className="fw-bold text-center mb-5">🛒 Your Shopping Cart</h2>

{cartItems.length===0?(
<div className="text-center">

<h4>Your cart is empty 😔</h4>
<p>Looks like you haven’t added anything yet.</p>

<Button variant="dark" href="/products" className="mt-3">
Start Shopping
</Button>

</div>

):(

<Row>

{/* CART ITEMS */}

<Col md={8}>

{cartItems.map(item=>(

<Card key={item.id} className="mb-4 shadow-sm">

<Card.Body className="d-flex align-items-center">

<img
src={item.image}
alt={item.name}
width={80}
height={80}
className="rounded-2"
/>

<div className="ms-4 flex-grow-1">

<h6 className="fw-bold">{item.name}</h6>

<p className="text-muted mb-1">₹{item.price}</p>

<div className="d-flex align-items-center gap-2 mt-2">

<Button
size="sm"
variant="outline-dark"
onClick={()=>decreaseQty(item.id)}
>
−
</Button>

<span className="fw-bold">{item.quantity}</span>

<Button
size="sm"
variant="outline-dark"
onClick={()=>increaseQty(item.id)}
>
+
</Button>

</div>
</div>

<div className="text-end me-3 fw-bold">
₹{item.price*item.quantity}
</div>

<Button
variant="light"
className="text-danger"
onClick={()=>removeItem(item.id)}
>
<FaTrash/>
</Button>

</Card.Body>

</Card>

))}

</Col>

{/* ORDER SUMMARY */}

<Col md={4}>

<Card className="shadow-sm rounded-4 p-3">

<Card.Body>

<h5 className="fw-bold mb-3">Order Summary</h5>

<div className="d-flex justify-content-between mb-2">
<span>Subtotal</span>
<span>₹{total}</span>
</div>

<div className="d-flex justify-content-between mb-3">
<span>Shipping</span>
<span className="text-success">Free</span>
</div>

<hr/>

<div className="d-flex justify-content-between mb-4">

<span className="fw-bold">Total</span>

<span className="fw-bold fs-5">₹{total}</span>

</div>

<div className="d-grid gap-2">

<Button
variant="primary"
onClick={()=>setShowIndianForm(true)}
>
🇮🇳 Checkout for Indian Address
</Button>

<Button
variant="dark"
onClick={()=>setShowInternationalForm(true)}
>
🌍 Checkout for International Address
</Button>

</div>

</Card.Body>

</Card>

</Col>

</Row>

)}

{/* ------------------ INDIAN FORM MODAL ------------------ */}

<Modal
show={showIndianForm}
onHide={()=>setShowIndianForm(false)}
centered
size="lg"
>

<Modal.Header closeButton>
<Modal.Title>Indian Delivery Details</Modal.Title>
</Modal.Header>

<Modal.Body>

<Form>

<Row className="mb-3">

<Col>
<Form.Control
name="firstName"
placeholder="First Name"
value={formData.firstName}
onChange={handleChange}
/>
</Col>

<Col>
<Form.Control
name="lastName"
placeholder="Last Name"
value={formData.lastName}
onChange={handleChange}
/>
</Col>

</Row>

<Form.Control
name="email"
placeholder="Email"
className="mb-3"
value={formData.email}
onChange={handleChange}
/>

<Form.Control
name="phone"
placeholder="Phone"
className="mb-3"
value={formData.phone}
onChange={handleChange}
/>

<InputGroup className="mb-3">

<Form.Control
name="address"
placeholder="Address"
value={formData.address}
onChange={handleChange}
/>

<InputGroup.Text>
<FaSearch/>
</InputGroup.Text>

</InputGroup>

<Row className="mb-3">

<Col>

<Form.Control
name="city"
placeholder="City"
value={formData.city}
onChange={handleChange}
/>

</Col>

<Col>

<Form.Select
name="state"
value={formData.state}
onChange={handleChange}
>

{allStates.map((state,index)=>(
<option key={index}>{state}</option>
))}

</Form.Select>

</Col>

<Col>

<Form.Control
name="pinCode"
placeholder="Pin Code"
value={formData.pinCode}
onChange={handleChange}
/>

</Col>

</Row>

<Button
variant="success"
className="w-100 fw-bold"
onClick={handleRazorpayPayment}
>

<FaCreditCard/> Pay Now ₹{total}

</Button>

</Form>

</Modal.Body>

</Modal>

{/* ------------------ INTERNATIONAL MODAL ------------------ */}

<Modal
show={showInternationalForm}
onHide={()=>setShowInternationalForm(false)}
centered
size="lg"
>

<Modal.Header closeButton>
<Modal.Title>International Delivery Details</Modal.Title>
</Modal.Header>

<Modal.Body>

<Form>

<Row className="mb-3">

<Col>

<Form.Control
placeholder="First Name"
onChange={(e)=>setInternationalData({...internationalData,firstName:e.target.value})}
/>

</Col>

<Col>

<Form.Control
placeholder="Last Name"
onChange={(e)=>setInternationalData({...internationalData,lastName:e.target.value})}
/>

</Col>

</Row>

<Form.Control
placeholder="Email"
className="mb-3"
onChange={(e)=>setInternationalData({...internationalData,email:e.target.value})}
/>

<Form.Control
placeholder="Phone"
className="mb-3"
onChange={(e)=>setInternationalData({...internationalData,phone:e.target.value})}
/>

<Form.Control
placeholder="Address"
className="mb-3"
onChange={(e)=>setInternationalData({...internationalData,address:e.target.value})}
/>

<Row className="mb-3">

<Col>

<Form.Control
placeholder="City"
onChange={(e)=>setInternationalData({...internationalData,city:e.target.value})}
/>

</Col>

<Col>

<Form.Select
onChange={(e)=>setInternationalData({...internationalData,country:e.target.value})}
>

<option>Select Country</option>

{countries.map((country,index)=>(
<option key={index}>{country}</option>
))}

</Form.Select>

</Col>

<Col>

<Form.Control
placeholder="Zip Code"
onChange={(e)=>setInternationalData({...internationalData,zipCode:e.target.value})}
/>

</Col>

</Row>

<Button
variant="success"
className="w-100 fw-bold"
onClick={handleStripePayment}
>

Pay with Card ₹{total}

</Button>

</Form>

</Modal.Body>

</Modal>

</Container>
);
}

export default Cart;