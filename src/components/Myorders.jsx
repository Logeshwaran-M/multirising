import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Spinner, Button } from "react-bootstrap";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";

function MyOrders() {

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [activeTab,setActiveTab] = useState("India");

useEffect(()=>{

const fetchOrders = async () => {

try{

const user = auth.currentUser;

if(!user){
setLoading(false);
return;
}

const q = query(
collection(db,"users",user.uid,"orders"),
orderBy("createdAt","desc")
);

const snapshot = await getDocs(q);

const ordersData = snapshot.docs.map(doc => ({
id:doc.id,
...doc.data()
}));

setOrders(ordersData);
setLoading(false);

}catch(error){

console.error("Error fetching orders:",error);
setLoading(false);

}

};

fetchOrders();

},[]);

const getStatusColor = (status)=>{
switch(status){
case "Delivered":
return "success";
case "Shipped":
return "primary";
case "Cancelled":
return "danger";
default:
return "warning";
}
};

const filteredOrders = orders.filter(order => order.orderType === activeTab);

if(loading){
return(

<div className="text-center mt-5">
<Spinner animation="border"/>
<p className="mt-3">Loading your orders...</p>
</div>
);
}

return(

<Container className="mt-5 p-4">

<h2 className="mb-4 fw-bold text-center">
🛍️ My Orders
</h2>

{/* Toggle Buttons */}

<div className="text-center mb-4">

<Button
className="me-2"
variant={activeTab==="India" ? "success" : "outline-success"}
onClick={()=>setActiveTab("India")}

>

🇮🇳 Indian Orders </Button>

<Button
variant={activeTab==="International" ? "primary" : "outline-primary"}
onClick={()=>setActiveTab("International")}

>

🌍 International Orders </Button>

</div>

{filteredOrders.length === 0 && (

<div className="text-center mt-5">
<h5>No {activeTab} Orders</h5>
<p className="text-muted">
You have not placed any {activeTab.toLowerCase()} orders yet.
</p>
</div>

)}

{filteredOrders.map(order => (

<Card
key={order.id}
className="mb-4 border-0 shadow rounded-4"
style={{background:"#ffffff"}}

>

<Card.Body>

<Row>

{/* Product Section */}

<Col md={8}>

<div className="d-flex justify-content-between mb-3">

<h6 className="fw-bold">
Order ID: {order.id}
</h6>

<small className="text-muted">
{order.createdAt?.seconds
? new Date(order.createdAt.seconds*1000).toLocaleDateString()
: ""}
</small>

</div>

{order.products.map(product => {

const quantity = product.quantity || 1;

return(

<div
key={product.id}
className="d-flex align-items-center mb-3 p-3 rounded"
style={{background:"#f8f9fa"}}
>

<img
src={product.image}
alt={product.name}
width={80}
height={80}
className="rounded shadow-sm"
/>

<div className="ms-3">

<h6 className="mb-1 fw-semibold">
{product.name}
</h6>

<small className="text-muted">
₹{product.price} × {quantity}
</small>

</div>

<div className="ms-auto fw-bold text-success">
₹{product.price * quantity}
</div>

</div>

);

})}

</Col>

{/* Order Summary */}

<Col md={4}>

<div
className="p-3 rounded-4"
style={{
background: activeTab==="India"
? "linear-gradient(135deg,#e6ffe6,#f2fff2)"
: "linear-gradient(135deg,#e6f0ff,#f2f6ff)"
}}
>

<h6 className="fw-bold mb-3">
Order Summary
</h6>

<p className="mb-2">
<b>Total:</b> ₹{order.totalAmount}
</p>

<p className="mb-2">
<b>Order Type:</b> {order.orderType}
</p>

<p className="mb-3">
<b>Status:</b>{" "}
<Badge bg={getStatusColor(order.orderStatus)}>
{order.orderStatus || "Pending"}
</Badge>
</p>

<hr/>

<p className="fw-semibold mb-1">
Delivery Address
</p>

<small className="text-muted">
{order.address?.address}<br/>
{order.address?.city}<br/>
{order.address?.state || order.address?.country}
</small>

</div>

</Col>

</Row>

</Card.Body>

</Card>

))}

</Container>

);

}

export default MyOrders;
