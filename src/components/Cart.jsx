import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {


    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();
const navigate = useNavigate();

const [showLoginPopup,setShowLoginPopup] = useState(false);

const handleCheckout = (type) => {

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
setShowLoginPopup(true);
return;
}

if(type==="india"){
navigate("/checkout-india");
}else{
navigate("/checkout-international");
}

};

return(

<Container className="p-5 mt-5">

<h2 className="fw-bold text-center mb-5">🛒 Your Shopping Cart</h2>

{cartItems.length===0?(

<div className="text-center">

<h4>Your cart is empty </h4>
<p>Looks like you haven’t added anything yet.</p>

<Button variant="dark" onClick={()=>navigate("/products")} className="mt-3">
Start Shopping </Button>

</div>

):(

<Row>

{/* CART ITEMS */}

<Col md={8}>

{cartItems.map(item=>(

<Card key={item.id} className="mb-4 shadow-sm rounded-3">

<Card.Body className="d-flex align-items-center">

<img
src={item.image}
alt={item.name}
width={80}
height={80}
className="rounded"
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

− </Button>

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

<div className="text-end me-3 fw-bold text-success">
₹{item.price * item.quantity}
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
onClick={()=>handleCheckout("india")}

>

🇮🇳 Checkout for Indian Address </Button>

<Button
variant="dark"
onClick={()=>handleCheckout("international")}

>

🌍 Checkout for International Address </Button>

</div>

</Card.Body>

</Card>

</Col>

</Row>

)}

{/* LOGIN POPUP */}

<Modal
show={showLoginPopup}
onHide={()=>setShowLoginPopup(false)}
centered

>

<Modal.Header closeButton>

<Modal.Title>
🔒 Login Required
</Modal.Title>

</Modal.Header>

<Modal.Body className="text-center">

<p>You must login before placing an order.</p>

</Modal.Body>

<Modal.Footer>

<Button
variant="secondary"
onClick={()=>setShowLoginPopup(false)}

>

Cancel </Button>

<Button
variant="success"
onClick={()=>navigate("/auth")}

>

Login Now </Button>

</Modal.Footer>

</Modal>

</Container>

);
}

export default Cart;
