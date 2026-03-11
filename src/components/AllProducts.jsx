import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products } from "./produc"; // ✅ Import here
import "../components/css/slide.css";
import panner from "../assets/productPanner.jpeg"

function Products() {
  const { addToCart,cartItems } = useCart();
  const navigate = useNavigate();

  const handleAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("✅ Product Added to Cart!");
  };

  return (<>
 
 <img 
  src={panner} 
  alt=""  
  style={{height:"380px",width:"100%",paddingTop:"40px"}}
  data-aos="fade-down"
/>
  <div className="top-scroll-bar mt-3" data-aos="fade-up">
  <div className="scroll-content">

    <div className="scroll-item">🌿 100% Natural Areca Leaf Plates</div>
    <div className="scroll-item">♻️ Eco-Friendly & Biodegradable</div>
    <div className="scroll-item">🍽️ Round, Square & Compartment Plates</div>
    <div className="scroll-item">🔥 Safe for Hot & Cold Food</div>
    <div className="scroll-item">📦 Bulk Orders for Events</div>
    <div className="scroll-item">🚚 Fast Delivery Across India</div>

    {/* Duplicate for seamless effect */}
    <div className="scroll-item">🌿 100% Natural Areca Leaf Plates</div>
    <div className="scroll-item">♻️ Eco-Friendly & Biodegradable</div>
    <div className="scroll-item">🍽️ Round, Square & Compartment Plates</div>
    <div className="scroll-item">🔥 Safe for Hot & Cold Food</div>
    <div className="scroll-item">📦 Bulk Orders for Events</div>
    <div className="scroll-item">🚚 Fast Delivery Across India</div>

  </div>
</div>

    <Container className="py-5 my-3 card rounded-4">
  <Row className="text-center">
   <Col md={3} data-aos="fade-up" data-aos-delay="100">
      <h2 className="fw-bold text-success">500K+</h2>
      <p>Plates Produced Monthly</p>
    </Col>
    <Col md={3} data-aos="fade-up" data-aos-delay="200">
      <h2 className="fw-bold text-success">25+</h2>
      <p>Product Variants</p>
    </Col>
    <Col md={3} data-aos="fade-up" data-aos-delay="300">
      <h2 className="fw-bold text-success">10+</h2>
      <p>Export Countries</p>
    </Col>
    <Col md={3} data-aos="fade-up" data-aos-delay="400">
      <h2 className="fw-bold text-success">100%</h2>
      <p>Eco-Friendly Commitment</p>
    </Col>
  </Row>
</Container>
    <Container className="py-5 text-center">
       <h2 
  className="fw-bold brand-title"
  data-aos="fade-up"
>
  🌿 Our Eco Products
</h2>

      <Row className="g-4">
       {products.map((product, index) => (
  <Col 
    key={product.id} 
    xs={6} 
    md={3}
    data-aos="zoom-in"
    data-aos-delay={index * 100}
  >
           <Card
  className="h-100 shadow-sm border-0 rounded-4"
  style={{ cursor: "pointer" }}
  onClick={() =>
    navigate(`/product/${product.id}`, { state: { checkout: "india" } })
  }
>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "160px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                <h6>{product.name}</h6>
                <p className="fw-bold text-success">₹{product.price}</p>

              <Button
  variant={cartItems.some((item) => item.id === product.id) ? "outline-primary" : "outline-success"}
  className="mt-auto rounded-pill"
  onClick={(e) => {
    e.stopPropagation();

    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);
      toast.success("✅ Product Added to Cart!");
    }
  }}
>
  {cartItems.some((item) => item.id === product.id) ? "View Cart" : "Add to Cart"}
</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}

export default Products;