import { Container, Row, Col, Card } from "react-bootstrap";
import round from "../assets/round.png"
import square from "../assets/square.png"
import trays from "../assets/Trays.png"
import spoons from "../assets/spoons.png"
import compartment from "../assets/compartment.png"
import bowl from "../assets/Bowls.png"

const products = [
  { title: "Round Plates (6”–12”)", img: round },
  { title: "Square Plates", img: square },
  { title: "Compartment Plates", img:compartment  },
  { title: "Bowls", img: bowl},
  { title: "Trays", img: trays},
  { title: "Spoons", img: spoons },
];

export default function ShapesSection() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-3">
          📏 Available Shapes & Sizes
        </h2>
        <p className="text-center text-muted mb-5">
          Premium biodegradable areca palm leaf products in various shapes and sizes.
        </p>

        <Row>
          {products.map((item, index) => (
            <Col md={4} sm={6} key={index} className="mb-4">
              <Card className="shadow border-0 h-100 text-center">
                <Card.Img variant="top" src={item.img} />
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    {item.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}