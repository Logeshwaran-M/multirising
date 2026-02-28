import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { products } from "./produc"; // ✅ Import here

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h3>Product Not Found</h3>;

  const handleAdd = () => addToCart(product);
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid rounded />
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>
          <h4 className="text-success">₹{product.price}</h4>
          <p>{product.description}</p>

          <div className="d-flex gap-3 mt-4">
            <Button variant="outline-success" onClick={handleAdd}>
              Add to Cart
            </Button>
            <Button variant="success" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;