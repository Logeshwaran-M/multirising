import banner from "../assets/abroad.png";
import MultiImageCarousel from "./Carosal";
import frame1 from "../assets/Frame1.jpg";
import frame2 from "../assets/Frame2.jpg";
import frame3 from "../assets/Frame3.jpg";
import frame4 from "../assets/Frame4.png";
import frame5 from "../assets/Frame5.png";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { addDoc } from "firebase/firestore";

import AOS from "aos";
import "aos/dist/aos.css";

import "./css/abroad.css";

const CountriesSection = () => {

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo",
  "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
  "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
  "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru",
  "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste",
  "Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

   const API_URL =
  window.location.hostname === "localhost"
    ? "https://multirising.vercel.app"
    : "https://multirising.vercel.app";
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bulkData, setBulkData] = useState({});


  const handleBulkChange = (e) => {
  const { name, value } = e.target;
  setBulkData({ ...bulkData, [name]: value });
};



const handleBulkSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "bulkOrders"), bulkData);

    toast.success("Request submitted successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }

    try {
    // ✅ 1. Save to Firestore
    await addDoc(collection(db, "bulkOrders"), bulkData);

    // ✅ 2. Send Email via Vercel API
    const res = await fetch(`${API_URL}/api/send-bulk-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({ ...bulkData, type: "bulk" }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Email failed");
    }

    toast.success("Request submitted & email sent!");
    
    // ✅ Clear form
    setBulkData({
      name: "",
      email: "",
      phone: "",
      country: "",
      quantity: "",
      message: "",
    });

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;

  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
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
    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const images = [
    { url: frame1, title: "Add Products to the Cart" },
    { url: frame5, title: "Fast & Reliable Shipping Worldwide" },
    { url: frame2, title: "Select International Address" },
    { url: frame3, title: "Add Delivery Address" },
    { url: frame4, title: "Pay with Indian and Foreign Currency" },
  ];

  return (

    <div className="products-page-wrapper">

      {/* HERO BANNER */}

      <img
        src={banner}
        alt="Send Gifts Worldwide"
        className="hero-banner"
        data-aos="fade-down"
      />

      <div className="py-4" data-aos="fade-up">
        <MultiImageCarousel />
      </div>

      {/* PRODUCTS */}

      <div className="my-5 products-section">

        <Row className="mb-4 g-3" data-aos="fade-up">

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col md={6}>
            <Form.Select
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
          </Col>

        </Row>

        <div className="mb-4 d-flex flex-wrap gap-2" data-aos="fade-up">

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

        <h2 className="main-heading mb-4" data-aos="fade-up">
          Our Premium <span>Products</span>
        </h2>

        <Row className="g-4">

          {filteredProducts.map((product, index) => (

            <Col
              key={product.id}
              lg={3}
              md={4}
              sm={6}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <Card
                className="product-card-modern border-0"
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: { checkout: "international" },
                  })
                }
              >

                <div className="card-img-container">

                  <Card.Img variant="top" src={product.image} />

                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >

                    <i
                      className={`bi ${
                        favorites[product.id]
                          ? "bi-heart-fill liked"
                          : "bi-heart"
                      }`}
                    ></i>

                  </button>

                </div>

                <Card.Body className="px-0">

                  <div className="d-flex justify-content-between align-items-start">

                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>

                    {/* <span className="product-price">
                      ₹{product.price}
                    </span> */}

                  </div>

                  <div className="rating-stars mb-2 mt-1">

                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>

                    <span className="review-count ms-1">(121)</span>

                  </div>

                  <Button
                    variant={
                      cartItems.some((item) => item.id === product.id)
                        ? "primary"
                        : "success"
                    }
                    className="w-100 mt-2 rounded-pill"
                    onClick={(e) => {

                      e.stopPropagation();

                      if (cartItems.some((item) => item.id === product.id)) {

                        navigate("/cart");

                      } else {

                        addToCart(product);
                        toast.success("Added to cart");

                      }

                    }}
                  >

                    {cartItems.some((item) => item.id === product.id)
                      ? "View Cart"
                      : "Add to Cart"}

                  </Button>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      </div>

      <div className="bulk-order-section py-5 bg-white">

  <Container>

    <h2 className="main-heading text-center mb-3">
      Bulk Orders <span>Worldwide</span>
    </h2>

    <p className="text-center text-muted mb-4">
      Need large quantity or custom design? Submit your request and we’ll contact you.
    </p>

    <Row className="justify-content-center">

      <Col md={8}>

        <Card className="p-4 shadow-sm border-0 rounded-4">

          <Form onSubmit={handleBulkSubmit}>

            <Form.Control
              name="name"
              placeholder="Full Name"
              onChange={handleBulkChange}
               value={bulkData.name || ""} 
              className="mb-3"
            />

            <Form.Control
              name="email"
              placeholder="Email"
              onChange={handleBulkChange}
                value={bulkData.email || ""}
              className="mb-3"
            />

            <Form.Control
              name="phone"
              placeholder="Phone Number"
              onChange={handleBulkChange}
                value={bulkData.phone || ""} 
              className="mb-3"
            />

      <Form.Select
  name="country"
  onChange={handleBulkChange}
  className="mb-3"
 
   value={bulkData.country || ""} 
>
  <option value="">Select Country</option>
  {countries.map((c, idx) => (
    <option key={idx} value={c}>{c}</option>
  ))}
</Form.Select>

            <Form.Control
              name="quantity"
              placeholder="Quantity"
              onChange={handleBulkChange}
               value={bulkData.quantity || ""} 
              className="mb-3"
            />

            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              placeholder="Requirements"
              onChange={handleBulkChange}
               value={bulkData.message || ""} 
              className="mb-3"
            />

            <Button type="submit" className="w-100">
              Submit Bulk Request
            </Button>

          </Form>

        </Card>

      </Col>

    </Row>

  </Container>

</div>

      {/* PROCESS */}

      <div className="bg-light py-5 text-center">

        <Container>

          <h2 className="main-heading mb-2" data-aos="fade-up">
            How We Make Shopping Easy
          </h2>

          <p className="text-muted mb-5" data-aos="fade-up">
            Step-by-step process for global delivery
          </p>

          <div className="d-flex gap-3 overflow-auto pb-4">

            {images.map((item, index) => (

              <Card
                key={index}
                className="border-0 shadow-sm rounded-4 flex-shrink-0"
                style={{ width: "240px" }}
                data-aos="flip-left"
                data-aos-delay={index * 150}
              >

                <Card.Img
                  variant="top"
                  src={item.url}
                  style={{ height: "160px", objectFit: "cover" }}
                />

                <Card.Body>

                  <Card.Text className="fw-bold small">
                    {item.title}
                  </Card.Text>

                </Card.Body>

              </Card>

            ))}

          </div>

        </Container>

      </div>

    </div>

  );
};

export default CountriesSection;