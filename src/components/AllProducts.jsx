import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products } from "./produc"; // ✅ Import here
import "../components/css/slide.css";
import panner from "../assets/productPanner.jpeg"

function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("✅ Product Added to Cart!");
  };

  return (<>

  <img src={panner} alt=""  style={{height:"380px",width:"100%"}}/>
  <div className="top-scroll-bar mt-3">
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
    <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">🌿 Our Eco Products</h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={6} md={3}>
            <Card
              className="h-100 shadow-sm border-0 rounded-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
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
                  variant="success"
                  className="mt-auto rounded-pill"
                  onClick={(e) => handleAdd(product, e)}
                >
                  Add to Cart
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