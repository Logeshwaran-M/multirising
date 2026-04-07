import heroImage from "../assets/palm.jpg"; // your background image
import { Container,Row,Col } from "react-bootstrap";
import AOS from "aos";
import { useEffect } from "react";

export default function Facilities(){


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    return(<>

     <section
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        position: "relative",
      }}
      className="home-page"
    >
      {/* Dark Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
     <h1 className="fw-bold" data-aos="fade-down">
  FACILITIES
</h1>

        {/* Small underline */}
       <div
  style={{
    width: "60px",
    height: "3px",
    backgroundColor: "white",
    margin: "10px auto",
  }}
  data-aos="fade-up"
></div>
      </div>
    </section>

    <Container className="py-5">
  <Row className="text-center mb-4">
    <Col>
      <h2
  className="fw-bold border-bottom border-3 border-success d-inline-block brand-title pb-2"
  data-aos="fade-up"
>
  Our Facilities
</h2>
     <p
  className="text-muted mt-3 px-md-5"
  data-aos="fade-up"
  data-aos-delay="200"
>
        Multirising Exports operates with advanced infrastructure and strict
        quality control systems to ensure premium-grade eco-friendly products
        for global markets.
      </p>
    </Col>
  </Row>

  <Row className="g-4">

    <Col md={4}>
      <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="100"
>
        <h5 className="fw-bold">🏭 Modern Manufacturing Unit</h5>
        <p className="text-muted">
          Equipped with advanced heat-press technology to produce durable,
          uniform and export-quality areca leaf plates.
        </p>
      </div>
    </Col>

    <Col md={4}>
   <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="200"
>
        <h5 className="fw-bold">🧪 Quality Control Lab</h5>
        <p className="text-muted">
          Every batch is inspected for strength, finish, hygiene, and
          international export standards compliance.
        </p>
      </div>
    </Col>

    <Col md={4}>
    <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="300"
>
        <h5 className="fw-bold">📦 Hygienic Packaging Unit</h5>
        <p className="text-muted">
          Products are packed in moisture-resistant, eco-safe packaging
          ensuring safe international shipping.
        </p>
      </div>
    </Col>

    <Col md={4}>
   <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="400"
>
        <h5 className="fw-bold">🌍 Export & Logistics Support</h5>
        <p className="text-muted">
          Strong supply chain network enabling timely delivery to multiple
          countries worldwide.
        </p>
      </div>
    </Col>

    <Col md={4}>
    <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="500"
>
        <h5 className="fw-bold">🌱 Sustainable Sourcing</h5>
        <p className="text-muted">
          Naturally fallen areca leaves are sourced responsibly, ensuring zero
          harm to trees and environment.
        </p>
      </div>
    </Col>

    <Col md={4}>
     <div
  className="p-4 shadow-sm rounded-4 bg-light h-100"
  data-aos="fade-up"
  data-aos-delay="600"
>
        <h5 className="fw-bold">👷 Skilled Workforce</h5>
        <p className="text-muted">
          Experienced team dedicated to maintaining quality, precision and
          customer satisfaction.
        </p>
      </div>
    </Col>

  </Row>
</Container>
        <Container className="py-5">
  <Row className="mb-4 text-center">
    <Col>
      <h2 className="fw-bold border-bottom border-3 brand-title border-success d-inline-block pb-2">
        Where Our Areca Plates Shine
      </h2>
      <p className="text-muted mt-3 px-md-5">
        Our eco-friendly areca leaf plates are trusted across industries and
        events for their durability, natural elegance, and sustainability.
        They combine strength with environmental responsibility.
      </p>
    </Col>
  </Row>

  <Row className="align-items-center g-4">

    {/* Image 1 */}
    <Col md={6}>
     <div style={{ position: "relative" }}>
     
   <div
  className="image-hover shadow-lg"
  data-aos="zoom-in-right"
>
         <img
    src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800"
    alt=""
    className="img-fluid"
    style={{ height: "350px", objectFit: "cover", width: "100%" }}
  />
       
 
</div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
            padding: "20px",
            borderRadius: "0 0 20px 20px"
          }}
        >
          <h5 className="fw-bold">Events & Celebrations</h5>
          <p className="mb-0">
            Perfect for weddings, birthdays, festivals & corporate gatherings.
          </p>
        </div>
      </div>
    </Col>

    {/* Image 2 */}
    <Col md={6}>
      <div style={{ position: "relative" }}>
     <div
  className="image-hover shadow-lg"
  data-aos="zoom-in-left"
>
  <img
    src="https://static.vecteezy.com/system/resources/thumbnails/039/001/632/original/eco-friendly-tableware-set-on-a-wooden-table-video.jpg"
    alt=""
    className="img-fluid"
    style={{ height: "350px", objectFit: "cover", width: "100%" }}
  />
</div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
            padding: "20px",
            borderRadius: "0 0 20px 20px"
          }}
        >
          <h5 className="fw-bold">Catering & Restaurants</h5>
          <p className="mb-0">
            A sustainable solution for eco-conscious dining businesses.
          </p>
        </div>
      </div>
    </Col>

  </Row>
</Container>


        </>)
}