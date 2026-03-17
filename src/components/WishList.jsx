import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import "./css/wishlist.css";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  /* REMOVE PRODUCT WITH POPUP */

const removeFromWishlist = async (id) => {

  const result = await Swal.fire({
    title: "Remove Product?",
    text: "Do you want to remove this product from wishlist?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Remove"
  });

  if(result.isConfirmed){

    const updatedWishlist = wishlist.filter(
      item => String(item.id) !== String(id)
    );

    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    Swal.fire(
      "Removed!",
      "Product removed from wishlist",
      "success"
    );
  }
};

  /* ADD TO CART */

  const addToCart = (product) => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => String(item.id) === String(product.id));

    if(exists){

      Swal.fire({
        icon:"info",
        title:"Already in Cart"
      });

      return;
    }

    cart.push({...product, quantity:1});

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon:"success",
      title:"Added to Cart 🛒",
      timer:1500,
      showConfirmButton:false
    });

  };

  return (
    <Container className="py-5 mt-3">

      <h2 className="fw-bold text-center main-heading mb-5">
        ❤️ My Wishlist
      </h2>

      {wishlist.length === 0 ? (

        <div className="text-center mt-5">

          <h5>No products in wishlist</h5>

          <p className="text-muted">
            Save your favourite items here
          </p>

        </div>

      ) : (

        <Row>

          {wishlist.map((product) => (

            <Col md={4} key={product.id} className="mb-4">

              <Card className="wishlist-card shadow-sm h-100 border-0">

                {/* Image */}

                <div className="wishlist-img-box">

                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="wishlist-img"
                  />

                </div>

                <Card.Body className="text-center">

                  <Card.Title className="fw-semibold">
                    {product.name}
                  </Card.Title>

                  <h5 className="text-success fw-bold mb-3">
                    ₹ {product.price}
                  </h5>

                  <div className="d-flex justify-content-center gap-2">

                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      <FaShoppingCart className="me-1"/>
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <FaTrash className="me-1"/>
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