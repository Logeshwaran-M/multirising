import { Container, Row, Col, Card } from "react-bootstrap";
import round from "../assets/round.png";
import square from "../assets/square.png";
import trays from "../assets/Trays.png";
import spoons from "../assets/spoons.png";
import compartment from "../assets/compartment.png";
import bowl from "../assets/Bowls.png";
import AOS from "aos";
import { useEffect } from "react";

const products = [
  { title: "Round Plates (6”–12”)", img: round },
  { title: "Square Plates", img: square },
  { title: "Compartment Plates", img: compartment },
  { title: "Bowls", img: bowl },
  { title: "Trays", img: trays },
  { title: "Spoons", img: spoons },
];

export default function ShapesSection() {
   useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  
  return (
    <section className="py-5 bg-light text-center home-page">
      <Container>
        <div className="mb-5">
               <h2 className="fw-bold brand-title">
            Available Shapes & Sizes
          </h2>
          <p className="text-muted mt-3">
            Explore our eco-friendly premium areca leaf product range.
          </p>
        </div>

        <Row className="g-4">
          {products.map((item, index) => (
            <Col md={4} sm={6} key={index}>
              <Card
  className="product-card shadow-sm border-0 brand-card-hover"
  data-aos="fade-up"
  data-aos-delay={item * 200}
>
                <div style={{ overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={item.img}
                    style={{
                      height: "220px",
                      objectFit: "contain",
                      transition: "transform 0.4s ease",
                    }}
                    className="product-img"
                  />
                </div>

                <Card.Body>
                  <Card.Title className="fw-semibold text-dark">
                    {item.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Inline Hover Effects */}
      <style>
        {`
          .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          }

          .product-card:hover .product-img {
            transform: scale(1.08);
          }
        `}
      </style>
    </section>
  );
}