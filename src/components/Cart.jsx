import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { FaTrash } from "react-icons/fa";


function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-5 cart-title">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-box text-center">
          <h4>Your cart is empty 😔</h4>
          <p>Looks like you haven’t added anything yet.</p>
          <Button variant="dark" href="/products" className="mt-3">
            Start Shopping
          </Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="cart-card mb-4">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-img"
                  />

                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-muted mb-1">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="qty-box">
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => decreaseQty(item.id)}
                      >
                        −
                      </Button>

                      <span className="qty-number">
                        {item.quantity}
                      </span>

                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-end me-3">
                    <div className="fw-bold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="light"
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <Card className="summary-card">
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

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-5">₹{total}</span>
                </div>

                <div className="d-grid gap-2">
                  <Button className="indian-checkout-btn">
                    🇮🇳 Checkout for Indian Address
                  </Button>

                  <Button className="international-checkout-btn">
                    🌍 Checkout for International Address
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;