import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useCart } from "../CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation ,} from "react-router-dom";
import { placeOrder } from "../Services/orderService";
import { auth } from "../../firebase";

function CheckoutInternational(){

const { cartItems, total } = useCart();
const navigate = useNavigate();
const location = useLocation();

const getCurrentLocation = () => {

if (!navigator.geolocation) {
alert("Geolocation is not supported");
return;
}

navigator.geolocation.getCurrentPosition(async (position) => {

const lat = position.coords.latitude;
const lng = position.coords.longitude;

try {

const res = await fetch(
`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCASQwQdrDCttNt6zkVw4zBqZfkVeWnf2I`
);

const dataRes = await res.json();

if (!dataRes.results || dataRes.results.length === 0) {
alert("Unable to fetch address");
return;
}

const addressComponents = dataRes.results[0].address_components;

let city = "";
let country = "";
let zipCode = "";

addressComponents.forEach((component) => {

if (component.types.includes("locality")) {
city = component.long_name;
}

if (component.types.includes("country")) {
country = component.long_name;
}

if (component.types.includes("postal_code")) {
zipCode = component.long_name;
}

});

setData((prev)=>({
...prev,
city,
country,
zipCode
}));

} catch (error) {

console.log("Location error:", error);
alert("Location fetch failed");

}

});

};

const [showPopup,setShowPopup] = useState(false);

const buyNowProduct = location.state?.product;

const productsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

const countries = [
"United States","United Kingdom","Canada","Australia","Germany","France",
"Italy","Spain","Netherlands","Sweden","Norway","Singapore","Malaysia",
"Japan","China","South Korea","United Arab Emirates","Saudi Arabia",
"South Africa","Brazil","Mexico","Russia","India"
];

const [data,setData]=useState({
firstName:"",
lastName:"",
email:"",
phone:"",
address:"",
city:"",
country:"",
zipCode:""
});

const handleChange = (e)=>{
const {name,value} = e.target;
setData({...data,[name]:value});
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
!data.firstName ||
!data.email ||
!data.phone ||
!data.address ||
!data.city ||
!data.country ||
!data.zipCode
){
alert("Please fill all delivery address fields");
return;
}

const orderData = {
orderType:"International",
products: productsToShow,
totalAmount: finalTotal,
address: data
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
🌍 International Checkout
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
<Button
variant="outline-primary"
className="mb-3"
onClick={getCurrentLocation}
>
📍 Use My Current Location
</Button>
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
value={data.city}
onChange={handleChange}
/>
</Col>

<Col>

<Form.Select
name="country"
value={data.country}
onChange={handleChange}

>

<option value="">Select Country</option>

{countries.map((country,index)=>(

<option key={index}>{country}</option>

))}

</Form.Select>

</Col>

<Col>
<Form.Control
name="zipCode"
placeholder="Zip Code"
value={data.zipCode}
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

{/* SUCCESS POPUP */}

<Modal
show={showPopup}
onHide={() => setShowPopup(false)}
centered

>

<Modal.Header closeButton>

<Modal.Title>
🎉 Order Placed Successfully
</Modal.Title>

</Modal.Header>

<Modal.Body className="text-center">

<p>Your order has been placed successfully.</p>

</Modal.Body>

<Modal.Footer>

<Button
variant="secondary"
onClick={()=>navigate("/products")}

>

Continue Shopping

</Button>

<Button
variant="success"
onClick={()=>navigate("/orders")}

>

Go to My Orders

</Button>

</Modal.Footer>

</Modal>

</Container>

);

}

export default CheckoutInternational;
