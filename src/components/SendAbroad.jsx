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
    { url: frame2, title: "Select International Address" },
    { url: frame3, title: "Add Delivery Address" },
    { url: frame4, title: "Pay with Indian and Foreign Currency" },
    { url: frame5, title: "Fast & Reliable Shipping WorldWide" },
  ];

  const products = [
    { id: 1, name: "organic jaggery", price: 2499, image: "https://organest.co.in/wp-content/uploads/2020/06/blogimage4.png" },
    { id: 2, name: "Tropical jackfruit", price: 599, image: "https://media.thenationaldigest.com/wp-content/uploads/2020/02/27164603/Tropical-Jackfruit-400x400-1.jpg" },
    { id: 3, name: "Ice apple", price: 899, image: "https://healthturnedup.com/wp-content/uploads/2024/04/dc87edbf-f1f4-455c-bbca-af208302a179-1024x683.png" },
    { id: 4, name: "Watermelon", price: 1299, image: "https://img.freepik.com/premium-photo/fresh-watermelon-slices-photo_863013-148801.jpg" },
    { id: 5, name: "Festival Special Kit", price: 1999, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500" },
    { id: 6, name: "Dry Fruits Pack", price: 1499, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500" },
    { id: 7, name: "Aromatic Candle Set", price: 799, image: "https://images.unsplash.com/photo-1602874801006-9d8b6c1a5f63?w=500" },
    { id: 8, name: "Luxury Tea Collection", price: 999, image: "https://images.unsplash.com/photo-1542444459-db63c6c0a3c9?w=500" },
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
        />
      </div>

      {/* 🔹 Countries Scroll */}
      <MultiImageCarousel />

      {/* 🔹 Products */}
      <Container className="my-5 text-center">
         <h2 className="fw-bold brand-title mb-4">Our Premium Products</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
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
         <h2 className="fw-bold brand-title">
          How We Make Your International Shopping Easy
        </h2>
        <p className="text-center mb-4 text-muted">
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