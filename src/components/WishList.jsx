import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./css/wishlist.css"

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);


  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <Container className="py-5 mt-3">
      <h2 className="fw-bold text-center main-heading mb-5">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-muted">No products in wishlist</p>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col md={4} key={product.id} className="mb-4">

              <Card className="wishlist-card shadow-sm h-100 border-0">

                {/* Product Image */}
                <div className="wishlist-img-box">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="wishlist-img"
                  />
                </div>

                <Card.Body className="text-center">

                  {/* Product Name */}
                  <Card.Title className="fw-semibold">
                    {product.name}
                  </Card.Title>

                  {/* Price */}
                  <h5 className="text-success fw-bold mb-3">
                    ₹ {product.price}
                  </h5>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </Button>

                    
                  </div>

                </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;