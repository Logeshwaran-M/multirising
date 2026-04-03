import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Spinner, Button, ProgressBar } from "react-bootstrap";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import jsPDF from "jspdf";
import { FaBox, FaCogs, FaTruck, FaCheckCircle, FaFlag, FaGlobeAsia  } from "react-icons/fa";
import "../components/css/myorders.css"
import Swal from "sweetalert2";

function MyOrders() {

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [activeTab,setActiveTab] = useState("India");
const [showTracking, setShowTracking] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);
const [trackingData, setTrackingData] = useState(null);
const [trackingLoading, setTrackingLoading] = useState(false);


const API_URL = "http://localhost:5000";

const handleTrackOrder = async (order) => {
  if (!order.awb) {
    Swal.fire("No Tracking", "AWB not available for this order", "info");
    return;
  }

  setSelectedOrder(order);
  setShowTracking(true);
  setTrackingLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/track/${order.awb}`);
    const data = await res.json();

    if (!data.success || data.data?.tracking_data?.error) {
      throw new Error(data.data?.tracking_data?.error || "Tracking failed");
    }

    setTrackingData(data.data);

  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.message, "error");
  } finally {
    setTrackingLoading(false);
  }
};

useEffect(()=>{

let unsubscribeOrders;

const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{

if(!user){
setLoading(false);
return;
}

const q = query(
collection(db,"users",user.uid,"orders"),
orderBy("createdAt","desc")
);

unsubscribeOrders = onSnapshot(q,(snapshot)=>{

const ordersData = snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

setOrders(ordersData);
setLoading(false);

});

});

return ()=>{
unsubscribeAuth();
if(unsubscribeOrders) unsubscribeOrders();
};

},[]);

const getStatusColor = (status)=>{

switch(status){
case "Delivered": return "success";
case "Shipped": return "primary";
case "Processing": return "info";
case "Cancelled": return "danger";
default: return "warning";
}

};





const cancelOrder = async (orderId) => {

const result = await Swal.fire({
title: "Cancel Order?",
text: "Are you sure you want to cancel this order?",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#d33",
cancelButtonColor: "#6c757d",
confirmButtonText: "Yes, Cancel it",
cancelButtonText: "No"
});

if(result.isConfirmed){

try{

const user = auth.currentUser;

const orderRef = doc(db,"users",user.uid,"orders",orderId);

await updateDoc(orderRef,{
orderStatus:"Cancelled"
});

setOrders(prev =>
prev.map(order =>
order.id === orderId
? {...order,orderStatus:"Cancelled"}
: order
)
);

Swal.fire(
"Cancelled!",
"Your order has been cancelled.",
"success"
);

}catch(error){

console.error(error);

Swal.fire(
"Error",
"Something went wrong",
"error"
);

}

}

};
const downloadInvoice = (order)=>{

const docPDF = new jsPDF();

docPDF.setFontSize(18);
docPDF.text("Order Invoice",20,20);

docPDF.setFontSize(12);

docPDF.text(`Order ID: ${order.id}`,20,40);
docPDF.text(`Order Type: ${order.orderType}`,20,50);
docPDF.text(`Status: ${order.orderStatus}`,20,60);
docPDF.text(`Total Amount: ₹${order.totalAmount}`,20,70);

let y = 90;

order.products?.forEach(p=>{
docPDF.text(`${p.name} - ₹${p.price} x ${p.quantity}`,20,y);
y+=10;
});

docPDF.save(`Invoice-${order.id}.pdf`);

};

const filteredOrders = orders.filter(o=>o.orderType===activeTab);

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

{/* Tabs */}

<div className="orders-tabs">

<div
className={`tab ${activeTab === "India" ? "active" : ""}`}
onClick={()=>setActiveTab("India")}
>
<FaFlag className="tab-icon"/>
<span>Indian Orders</span>
</div>

<div
className={`tab ${activeTab === "International" ? "active" : ""}`}
onClick={()=>setActiveTab("International")}
>
<FaGlobeAsia className="tab-icon"/>
<span>International Orders</span>
</div>

</div>

{filteredOrders.length===0 && (

<div className="text-center mt-5">

<h5>No {activeTab} Orders</h5>

<p className="text-muted">
You have not placed any {activeTab.toLowerCase()} orders yet.
</p>

</div>

)}

{filteredOrders.map(order=>(

<Card
key={order.id}
className="mb-4 border-0 shadow rounded-4"
>

<Card.Body>

<Row>

{/* Products */}

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

{order.products?.map(product=>{

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

{/* Summary */}

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

{/* Attractive Tracking */}

<p className="fw-semibold mb-3">
Order Tracking
</p>

<div className="order-tracking">

<div className={`step ${order.orderStatus ? "active" : ""}`}>
<div className="icon"><FaBox /></div>
<p>Ordered</p>
</div>

<div className={`step ${
["Processing","Shipped","Delivered"].includes(order.orderStatus)
? "active" : ""
}`}>
<div className="icon"><FaCogs /></div>
<p>Processing</p>
</div>

<div className={`step ${
["Shipped","Delivered"].includes(order.orderStatus)
? "active" : ""
}`}>
<div className="icon"><FaTruck /></div>
<p>Shipped</p>
</div>

<div className={`step ${
order.orderStatus==="Delivered"
? "active" : ""
}`}>
<div className="icon"><FaCheckCircle /></div>
<p>Delivered</p>
</div>

</div>

<hr/>

<p className="fw-semibold mb-1">
Delivery Address
</p>

<small className="text-muted">
{order.address?.address}<br/>
{order.address?.city}<br/>
{order.address?.state || order.address?.country}
</small>

{/* Buttons */}


<Button
  variant="primary"
  className="w-100 mt-2"
  onClick={() => handleTrackOrder(order)}
>
  Track Order
</Button>



<Button
variant="dark"
className="w-100 mt-2"
onClick={()=>downloadInvoice(order)}
>

Download Invoice

</Button>

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
