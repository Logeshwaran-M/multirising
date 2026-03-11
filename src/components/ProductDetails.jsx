import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Image, Card, Modal } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { products } from "./produc";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const location = useLocation();

  const checkoutType = location.state?.checkout;

  const [qty, setQty] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = products.find((p) => p.id === parseInt(id));

  const suggestions = products
    .filter((p) => p.id !== parseInt(id))
    .slice(0, 4);

  if (!product) return <h3 className="text-center mt-5">Product Not Found</h3>;

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setShowLogin(true);
      return false;
    }
    return true;
  };

  const handleAdd = () => {

    if (!checkLogin()) return;

    for (let i = 0; i < qty; i++) addToCart(product);

    toast.success("✅ Product added to cart!");

  };

  const handleBuyNow = () => {

    if (!checkLogin()) return;

    if (checkoutType === "international") {

      navigate("/checkout-international", {
        state: { product }
      });

    } else {

      navigate("/checkout-india", {
        state: { product }
      });

    }

  };

  return (
    <Container className="p-5 mt-5">

      {/* Back Button */}

      <Button
        variant="primary"
        className="shadow-sm"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </Button>

      <Row className="g-5">

        {/* Product Image */}

        <Col md={6}>
          <Image
            src={product.image}
            fluid
            rounded
            className="shadow-lg"
          />
        </Col>

        {/* Product Info */}

        <Col md={6}>

          <h2 className="fw-bold">{product.name}</h2>

          <div className="mb-2 text-warning">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            <span className="text-muted ms-2">(120 reviews)</span>
          </div>

          <h3 className="text-success fw-bold mb-3">
            ₹{product.price}
          </h3>

          <p className="text-muted">
            {product.description ||
              "Premium eco-friendly product made from natural materials. Safe for food and perfect for events and daily use."}
          </p>

          {/* Quantity */}

          <div className="d-flex align-items-center mb-4">

            <span className="me-3 fw-semibold">Quantity</span>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => qty > 1 && setQty(qty - 1)}
            >
              -
            </Button>

            <span className="px-3 fw-bold">{qty}</span>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setQty(qty + 1)}
            >
              +
            </Button>

          </div>

          {/* Buttons */}

          <div className="d-flex gap-3">

            <Button
              variant="outline-primary"
              size="lg"
              className="rounded-pill px-4"
              onClick={handleAdd}
            >
              Add to Cart
            </Button>

            <Button
              variant="success"
              size="lg"
              className="rounded-pill px-4"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

          </div>

          {/* Extra Info */}

          <div className="mt-4 p-3 bg-light rounded-3">

            <p className="mb-1">🚚 Free Delivery Available</p>
            <p className="mb-1">🔄 7 Days Easy Return</p>
            <p className="mb-0">🌿 100% Eco Friendly</p>

          </div>

        </Col>

      </Row>

      {/* Suggested Products */}

      <Row className="mt-5">

        <h4 className="fw-bold mb-4 text-center">
          You May Also Like
        </h4>

        {suggestions.map((item) => (

          <Col md={3} key={item.id}>

            <Card
              className="shadow-sm border-0 rounded-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >

              <Card.Img
                src={item.image}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <Card.Body className="text-center">

                <Card.Title className="fw-semibold">
                  {item.name}
                </Card.Title>

                <p className="text-success fw-bold">
                  ₹{item.price}
                </p>

                <Button
                  variant="success"
                  size="sm"
                  className="rounded-pill"
                  onClick={(e) => {

                    e.stopPropagation();

                    if (!checkLogin()) return;

                    addToCart(item);

                    toast.success("✅ Product added!");

                  }}
                >
                  Add
                </Button>

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>

      {/* LOGIN MODAL */}

      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>

        <Modal.Header closeButton>

          <Modal.Title>🔒 Login Required</Modal.Title>

        </Modal.Header>

        <Modal.Body className="text-center">

          <p>You must login before adding products or placing orders.</p>

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={() => setShowLogin(false)}>
            Cancel
          </Button>

          <Button variant="success" onClick={() => navigate("/login")}>
            Login Now
          </Button>

        </Modal.Footer>

      </Modal>

    </Container>
  );
}

export default ProductDetails;