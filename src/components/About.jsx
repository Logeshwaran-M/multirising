import heroImage from "../assets/palm.jpg";
import plate from "../assets/plates.webp";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 🔹 Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          className="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <h1 className="fw-bold display-6 display-md-5">
            ABOUT US
          </h1>

          <div
            className="bg-white mt-2"
            style={{ width: "60px", height: "3px" }}
          ></div>
        </div>
      </section>

      {/* 🔹 About Content */}
      
        <Container>
          <div className="text-center mt-3">
            <h2  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">About Us</h2>

            <p className="text-muted mx-auto" style={{ maxWidth: "900px" }}>
              At Multirising Exports, we are committed to delivering eco-friendly
              and sustainable alternatives to traditional disposable tableware.
              Our premium areca palm leaf products are crafted from naturally
              fallen leaves, ensuring zero harm to trees and the environment.
               We specialize in manufacturing high-quality biodegradable plates,
              bowls, and trays that are durable, chemical-free, and completely
              compostable. Every product is carefully washed and heat-pressed
              without chemicals, preserving the natural strength and texture.
               Our mission is to promote sustainable living by providing
              environmentally responsible solutions for homes, businesses, and
              global export markets.
            </p>
            
          </div>
        </Container>
   

      {/* 🔹 Quality Section */}
      <Container className="py-5">
        <Row className="align-items-center g-4">
          
          {/* Image */}
          <Col xs={12} md={6}>
            <Image src={plate} fluid rounded className="shadow" />
          </Col>

          {/* Text */}
          <Col xs={12} md={6}>
            <div className="mb-4 text-center text-md-start">
              <h4  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">Our Quality Assurance</h4>
              <p className="text-muted">
                We ensure consistent quality in all our areca leaf products.
                Every item is hygienically processed following international
                standards.
              </p>
            </div>

            <div className="text-center text-md-start">
              <h4  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2">Client Satisfaction</h4>
              <p className="text-muted">
                We focus on understanding client needs and delivering reliable,
                high-quality products with timely service and transparent
                business practices.
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </>
  );
}