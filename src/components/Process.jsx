import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaLeaf, FaHandHolding, FaIndustry, FaCheckCircle } from "react-icons/fa";
import "../components/css/ArecaLifecycle.css";
import AOS from "aos";
import { useEffect } from "react";


const lifecycleSteps = [
  {
    id: 1,
    icon: <FaLeaf />,
    title: "FALLEN LEAVES",
    description:
      "Ripened palm leaves naturally fall from trees. Nothing is forcefully taken — fully natural and eco-friendly.",
    image: "https://horticulture.co.uk/wp-content/uploads/2022/10/arecapalmplantcare-header-1600x1067.jpg",
  },
  {
    id: 2,
    icon: <FaHandHolding />,
    title: "LEAVES COLLECTION",
    description:
      "Leaves are manually collected with care, ensuring only perfect natural leaves are transported.",
    image: "https://www.arecaleafplates.com/assets/images/process/collection_of_fallen_areca_leaf.webp",
  },
  {
    id: 3,
    icon: <FaIndustry />,
    title: "ECO-MANUFACTURING",
    description:
      "Leaves are washed, steam-pressed and heat-molded into durable shapes — 100% chemical-free.",
      image: "https://rsmarecaplates.com/infrastructure/machine.jpg",
    
  },
  {
    id: 4,
    icon: <FaCheckCircle />,
    title: "QUALITY CONTROL",
    description:
      "Each product undergoes UV sterilization and strict quality checks before packaging.",
    image: "https://miro.medium.com/v2/resize:fit:736/1*jVc9zOREBsCNFMcqzZCJhg.jpeg",
  },
];

function ArecaLifecycle() {

  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
}, []);
  return (
    <section className="areca-section">
      <Container className="py-5">
        <h2 className="text-center lifecycle-title mb-5">
          🌿 Sustainable Life Cycle of Areca Leaf Plates
        </h2>

        {lifecycleSteps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
           <Row
  key={step.id}
  className={`align-items-center mb-5 ${
    index % 2 !== 0 ? "flex-md-row-reverse" : ""
  }`}
  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
>
              {/* Image */}
              <Col md={6}>
                <Card className="lifecycle-card">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fluid
                    className="lifecycle-img"
                  />
                </Card>
              </Col>

              {/* Content */}
              <Col md={6} className="mt-4 mt-md-0">
                <div className="icon-circle">{step.icon}</div>
                <h4 className="fw-bold mt-3">{step.title}</h4>
                <p className="text-muted">{step.description}</p>
              </Col>
            </Row>
          );
        })}
      </Container>
    </section>
  );
}

export default ArecaLifecycle;