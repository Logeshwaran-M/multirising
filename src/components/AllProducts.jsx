import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import AOS from "aos";
import "aos/dist/aos.css";

import panner from "../assets/productbanner.png";
import "./css/product.css";
import "./css/loading .css";

function Products() {

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [likedProducts, setLikedProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  const addToWishlist = (product) => {

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find((item) => item.id === product.id);

  if (!exists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
  }
};

  const fetchProducts = async () => {

    try {

      const snapshot = await getDocs(collection(db, "products"));

      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);

      const uniqueCategories = [
        ...new Set(productsData.map((p) => p.category)),
      ];

      setCategories(uniqueCategories);

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }

  };

  const toggleWishlist = (id) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="products-page-wrapper">

      {/* HERO BANNER */}

      <div className="hero-banner-container">

        <img
          src={panner}
          alt="Banner"
          className="hero-banner"
          data-aos="fade-down"
        />

        <div className="hero-overlay">

          <div className="hero-text" data-aos="fade-right">

            <h1>🌿 Discover Natural & Eco Products</h1>

            <p>
              Sustainable, eco-friendly products crafted with care.
              Shop natural items that are good for you and the planet.
            </p>

            <button
              className="shop-btn"
              onClick={() =>
                document
                  .querySelector(".main-heading")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Products
            </button>

          </div>

        </div>

      </div>

      {/* PRODUCTS SECTION */}

      <div className="products-section">

        {/* SEARCH + FILTER */}

        <Row className="filter-section mb-4 g-3 align-items-center" data-aos="fade-up">

          <Col md={6}>

            <div className="search-box">

              <i className="bi bi-search search-icon"></i>

              <Form.Control
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </Col>

          <Col md={6}>

            <div className="category-select">

              <i className="bi bi-grid category-icon"></i>

              <Form.Select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >

                <option value="">All Categories</option>

                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}

              </Form.Select>

            </div>

          </Col>

        </Row>

        {/* CATEGORY BUTTONS */}

        <div className="category-filter mb-4" data-aos="fade-up">

          <button
            className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>

          {categories.map((cat, idx) => (

            <button
              key={idx}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>

          ))}

        </div>

        <h2 className="main-heading" data-aos="fade-up">
          Products <span>For You</span>
        </h2>

        {/* PRODUCTS GRID */}

        <Row className="g-4">

          {loading ? (

            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading amazing products...</p>
            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="empty-products">
              <i className="bi bi-box-seam"></i>
              <h5>No products found</h5>
              <p>Try searching another product or category</p>
            </div>

          ) : (

            filteredProducts.map((product, index) => (

              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >

                <Card className="product-card-modern border-0 shadow-sm">

                  <div
                    className="card-img-container"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >

                    <Card.Img variant="top" src={product.image} />

                    <button
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);              
    addToWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price:product.price
    })
  
                      }}
                      
                    >
                      <i className={`bi ${likedProducts[product.id] ? "bi-heart-fill liked" : "bi-heart"}`}></i>
                    </button>

                  </div>

                  <Card.Body>

                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>

                    <div className="price-section">

                      {/* <span className="product-price">
                        ₹{product.price}
                      </span> */}

                    </div>

                    <div className="rating-stars mb-3">

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>

                    </div>

                    <Button
                      variant={cartItems.some((item) => item.id === product.id) ? "primary" : "success"}
                      className="w-100 action-btn rounded-pill"
                      onClick={(e) => {

                        e.stopPropagation();

                        if (cartItems.some((i) => i.id === product.id)) {
                          navigate("/cart");
                        } else {
                          addToCart(product);
                          toast.success("Added to Cart!");
                        }

                      }}
                    >

                      {cartItems.some((i) => i.id === product.id)
                        ? "View Cart"
                        : "Add to Cart"}

                    </Button>

                  </Card.Body>

                </Card>

              </Col>

            ))

          )}

        </Row>

      </div>

    </div>

  );
}

export default Products;