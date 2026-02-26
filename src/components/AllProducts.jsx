import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import "../components/css/slide.css"

const products = [
  { id: 1, name: "Round Plate 10 inch", price: 120, image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500" },
  { id: 2, name: "Square Plate", price: 140, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500" },
  { id: 3, name: "Leaf Bowl", price: 90, image: "https://images.unsplash.com/photo-1606312619344-3627b1f74b77?w=500" },
  { id: 4, name: "Serving Tray", price: 180, image: "https://images.unsplash.com/photo-1542444459-db63c6c0a3c9?w=500" },
];

function Products() {
  const { addToCart } = useCart();

  const handleAdd = (product) => {
    addToCart(product);
    toast.success("✅ Product Added to Cart!");
  };

  return (
<>
<div className="top-scroll-bar">
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
      <h2 className="fw-bold mb-4">🌿 Our Eco Products</h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={6} md={3}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
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
                  onClick={() => handleAdd(product)}
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