import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.jpeg";
import service1 from "../assets/fsdelivery.jpg";
import service2 from "../assets/premium.webp";
import service3 from "../assets/exports.jpg";
import ShapesSection from "./ShapeSection";
import iso from "../assets/iso.webp";
import support from "../assets/support.jpg";
import leaf from "../assets/leaf.jpg";
import '../components/css/home.css'
import frame from "../assets/frame1.png"
import frame2 from "../assets/frame2.png"

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section>

      {/* HERO WITH OVERLAY */}
      <div className="hero-wrapper brand-hero">
        <img src={heroImage} alt="Hero" className="hero-img" />
        <div className="hero-dark-overlay"></div>

        <div className="hero-overlay text-center">
          <h1 className="hero-title">
            Premium Areca Leaf Products
          </h1>
          <p className="hero-subtitle hero-title">
            Eco-friendly • Sustainable • Export Quality
          </p>
          <Button
            className="hero-btn  mt-3"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </div>
      </div>

  <a
  href="https://wa.me/919999999999"
  className="whatsapp-float"
  target="_blank"
  rel="noreferrer"
>
  <FaWhatsapp />
</a>



      {/* ABOUT SECTION */}
      <Container className="text-center py-5">
        <h2 className="fw-bold brand-title">
          Welcome To Multirising Exports
        </h2>
        <p className="text-muted px-md-5 mt-2">
          Multirising Exports delivers premium Areca leaf plates worldwide.
          Our eco-friendly plates are made using only water, heat, and pressure.
          No chemicals. No tree cutting. Just sustainable nature-friendly products.
        </p>
      </Container>

      {/* FEATURED PRODUCTS */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">
          Featured Products
        </h2>

        <Row className="g-4 mt-3">
          {[1, 2, 3].map((item) => (
            <Col md={4} key={item}>
              <Card className="product-card shadow-sm border-0 brand-card-hover">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600"
                />
                <Card.Body>
                  <h6 className="fw-bold brand-text">Areca Leaf Plate</h6>
                  <p className="text-muted">Eco-friendly disposable plate</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          className="shop-btn brand-btn mt-3"
          onClick={() => navigate("/products")}
        >
          Shop All Products →
        </Button>
      </Container>

      <Container fluid className="p-0">
  <img
    src={frame}
    alt="Banner"
    className="w-100"
    style={{ height: "350px", objectFit: "cover" }}
  />
</Container>

      {/* OUR SERVICES */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">Our Services</h2>

        <Row className="g-4 mt-3">
          {[service1, service2, service3].map((img, i) => (
            <Col md={4} key={i}>
              <div className="service-card shadow-sm p-3 brand-card-hover">
                <img src={img} alt="" className="rounded" />
                <h5 className="fw-bold mt-3 brand-text">
                  {i === 0
                    ? "Fast Delivery"
                    : i === 1
                    ? "Premium Quality"
                    : "Global Export"}
                </h5>
                <p className="text-muted">
                  {i === 0
                    ? "Quick & safe delivery worldwide."
                    : i === 1
                    ? "Highest international quality standards."
                    : "Reliable exports across the globe."}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <ShapesSection />


    <Container fluid className="p-0">
  <img
    src={frame2}
    alt="Banner"
    className="w-100"
    style={{ height: "450px", objectFit: "cover" }}
  />
</Container>
      {/* WHY CHOOSE US */}
<Container className="py-5 text-center">
  <h2 className="fw-bold brand-title mb-4">Why Choose Multirising Exports</h2>

 <Row className="g-4 mt-3">

  {/* 1 */}
  <Col md={4}>
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
      <img src={leaf} alt="Eco Friendly" style={{ width: "180px" }} />
      <h5 className="mt-3 brand-text">🌱 100% Natural & Eco-Friendly</h5>
      <p className="text-muted">
        Our products are made from naturally fallen Areca leaves.
        No chemicals, no plastic, no tree cutting — completely
        biodegradable and compostable.
          Each plate is carefully cleaned and heat-pressed without 
        altering its natural texture, ensuring a safe and eco-conscious 
        dining experience for homes, events, and businesses.
      </p>
    
    </div>
  </Col>

  {/* 2 */}
  <Col md={4}>
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
      <img src={iso} alt="Export Quality" style={{ width: "180px" }} />
      <h5 className="mt-3 brand-text">🌍 International Export Standards</h5>
      <p className="text-muted">
        Manufactured under strict hygiene and quality control
        processes to meet global export requirements.
          Our production facility follows international compliance 
        measures, ensuring consistency, durability, and packaging 
        standards suitable for global markets.
      </p>
   
    </div>
  </Col>

  {/* 3 */}
  <Col md={4}>
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
      <img src={support} alt="Trusted" style={{ width: "230px" }} />
      <h5 className="mt-3 brand-text">🤝 Trusted by Global Clients</h5>
      <p className="text-muted">
        We serve restaurants, wholesalers, and distributors
        worldwide with reliable service and long-term partnerships.
          Our commitment to timely delivery, transparent communication, 
        and consistent product quality has earned us trust across 
        multiple countries and industries.
      </p>
     
    </div>
  </Col>

</Row>
</Container>
    </section>
  );
};

export default HeroSection;
