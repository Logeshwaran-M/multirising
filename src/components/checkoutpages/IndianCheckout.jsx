import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useCart } from "../CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { auth } from "../../firebase";

function CheckoutIndia() {

const { cartItems, total } = useCart();
const navigate = useNavigate();
const location = useLocation();

const [showPopup, setShowPopup] = useState(false);

const buyNowProduct = location.state?.product;

const productsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

const [formData,setFormData] = useState({
firstName:"",
lastName:"",
email:"",
phone:"",
address:"",
city:"",
state:"Karnataka",
pinCode:""
});

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
!formData.address ||
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
address: formData
};

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
name="address"
placeholder="Address"
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
variant="success"
size="lg"
style={{borderRadius:"10px"}}
onClick={handlePlaceOrder}

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
