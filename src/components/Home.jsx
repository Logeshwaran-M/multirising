import { Container, Button } from "react-bootstrap";
import heroImage from "../assets/hero.jpeg";


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

      {/* 🔹 Content Inside Container */}
      <Container className="text-center py-5">
        <h1 className="fw-bold mb-3">
          Welcome to Our Company
        </h1>

        <p className="text-muted mb-4 px-md-5">
          We provide high-quality products crafted with precision and passion.
          Our mission is to deliver excellence and innovation in every product
          we offer to our customers.
        </p>

        <Button variant="primary" size="lg">
          Explore Products
        </Button>
      </Container>
   

    </section>
  );
};

export default HeroSection;