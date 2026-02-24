import { Container, Row,Col } from "react-bootstrap";
import heroImage from "../assets/hero.jpeg";
import service1 from "../assets/fsdelivery.jpg"; 
import service2 from "../assets/premium.webp";
import service3 from "../assets/exports.jpg";
import ShapesSection from "./ShapeSection";


const HeroSection = () => {
  return (
    <section>

      {/* 🔹 Full Width Image (Outside Container) */}
      <img
        src={heroImage}
        alt="Hero"
        className="w-100"
        style={{ height: "450px", objectFit: "cover" }}
      />
      {/* 🔹 New Section for Multirising Exports */}
      <Container className="text-center py-5  rounded-4 mt-5">
        <h2 className="fw-bold mb-1 text-success">
          Welcome To
        </h2>
        <h2 className="fw-bold mb-3 text-primary">
          Multirising Exports
        </h2>
        <p className="text-muted mb-0 px-md-5">
          Multirising Exports is dedicated to providing premium products to
          customers worldwide. We ensure quality, reliability, and excellence
          in every product we export.
          Areca catechu (areca palm tree). They’re also commonly called areca leaf plates or
          palm leaf plates. Areca leaf plates are an earth conscious choice for single-use disposables.
          There have no chemical polish or wax finish on the plates just pure palm leaf. Unlike wood plates, no trees are ever cut down  using only water, heat, and pressure in the manufacturing process.  With a woodlike appearance, areca leaf plates add a touch of 
          nature to any dining experience, making them a great substitute  during formal and casual events.

        </p>
      </Container>
    <ShapesSection/>
<Container className="py-5">
  <h2 className="text-center fw-bold mb-5 text-primary">Our Services</h2>
  <Row className="g-4">
    <Col md={4}>
      <div className="text-center p-4 shadow-sm rounded-4 h-100">
        <img
          src={service1}
          alt="Fast Delivery"
          className="mb-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h5 className="fw-bold mb-2">Fast Delivery</h5>
        <p className="text-muted">We ensure quick and safe delivery worldwide.</p>
      </div>
    </Col>
    <Col md={4}>
      <div className="text-center p-4 shadow-sm rounded-4 h-100">
        <img
          src={service2}
          alt="Premium Quality"
          className="mb-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h5 className="fw-bold mb-2">Premium Quality</h5>
        <p className="text-muted">Our products meet the highest international standards.</p>
      </div>
    </Col>
    <Col md={4}>
      <div className="text-center p-4 shadow-sm rounded-4 h-100">
        <img
          src={service3}
          alt="Global Export"
          className="mb-3"
          style={{width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h5 className="fw-bold mb-2">Global Export</h5>
        <p className="text-muted">We serve customers across the globe with reliability.</p>
      </div>
    </Col>
  </Row>
</Container>
   
    </section>
  );
};

export default HeroSection;