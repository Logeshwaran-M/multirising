import { Container, Row, Col, Card, Button } from "react-bootstrap";
import banner from "../assets/abroad.png";
import MultiImageCarousel from "./Carosal";
import frame1 from "../assets/Frame1.jpg";
import frame2 from "../assets/Frame2.jpg";
import frame3 from "../assets/Frame3.jpg";
import frame4 from "../assets/Frame4.png";
import frame5 from "../assets/Frame5.png";
import { useCart } from "../components/CartContext"; // ✅ Use Cart Context
import { toast } from "react-toastify";

const CountriesSection = () => {
  const { addToCart } = useCart(); // ✅ Cart function

  const images = [
    { url: frame1, title: "Add Products to the Cart" },
    { url: frame5, title: "Fast & Reliable Shipping WorldWide" },
    { url: frame2, title: "Select International Address" },
    { url: frame3, title: "Add Delivery Address" },
    { url: frame4, title: "Pay with Indian and Foreign Currency" },
    
  ];

 const products = [
  { id: 1, name: "organic jaggery", price: 2499, image: "https://organest.co.in/wp-content/uploads/2020/06/blogimage4.png" },
  { id: 2, name: "Tropical jackfruit", price: 599, image: "https://media.thenationaldigest.com/wp-content/uploads/2020/02/27164603/Tropical-Jackfruit-400x400-1.jpg" },
  { id: 3, name: "Ice apple", price: 899, image: "https://healthturnedup.com/wp-content/uploads/2024/04/dc87edbf-f1f4-455c-bbca-af208302a179-1024x683.png" },
  { id: 4, name: "Watermelon", price: 1299, image: "https://img.freepik.com/premium-photo/fresh-watermelon-slices-photo_863013-148801.jpg" },
  { id: 5, name: "bamboo baskets", price: 1999, image: "https://i.etsystatic.com/25551155/r/il/8425f6/2634950095/il_1080xN.2634950095_dhjr.jpg" },
  { id: 6, name: "chanpatna toys", price: 1499, image: "https://s7ap1.scene7.com/is/image/incredibleindia/channapatna-toys-and-dolls-Karnataka-1-craft-hero?qlt=82&ts=1726641410733" },
 
];

  // Add to cart function with toast notification
  const handleAdd = (product, e) => {
    e.stopPropagation(); // Prevent parent click (if any)
    addToCart(product);
    toast.success(`✅ ${product.name} added to cart!`);
  };

  return (
    <div className="home-page">
      {/* 🔹 Banner */}
      <div className="position-relative">
        <img
          src={banner}
          alt="Send Gifts Worldwide"
          className="w-100"
          style={{ height: "450px", objectFit: "cover" }}
          data-aos="fade-down"
        />
      </div>

      {/* 🔹 Countries Scroll */}
      <div data-aos="fade-up">
        <MultiImageCarousel />
      </div>

      {/* 🔹 Products */}
      <Container className="my-5 text-center">
        <h2
          className="fw-bold brand-title mb-4"
          data-aos="fade-up"
        >
          Our Premium Products
        </h2>
        <Row>
          {products.map((product, index) => (
            <Col
              key={product.id}
              lg={3}
              md={4}
              sm={6}
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Card className="h-100 shadow-sm border-0 rounded-4 hover-card">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title className="fw-semibold">{product.name}</Card.Title>
                  <Card.Text className="fw-bold text-primary fs-5">
                    ₹{product.price}
                  </Card.Text>
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

      {/* 🔹 Frames in single row */}
      <div className="p-2  text-center">
        <h2
          className="fw-bold brand-title"
          data-aos="fade-up"
        >
          How We Make Your International Shopping Easy
        </h2>
        <p
          className="text-center mb-4 text-muted"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Step-by-step process to get your favorite products delivered worldwide
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            padding: "10px 0",
          }}
        >
          {images.map((item, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 rounded-4 text-center hover-card"
              style={{ minWidth: "200px", flex: "0 0 auto" }}
              data-aos="flip-left"
              data-aos-delay={index * 150}
            >
              <Card.Img
                variant="top"
                src={item.url}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <Card.Body>
                <Card.Text className="fw-semibold" style={{ fontSize: "1rem" }}>
                  {item.title}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountriesSection;