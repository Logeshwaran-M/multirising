import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FaLeaf, FaHandHolding, FaIndustry, FaCheckCircle } from "react-icons/fa";
import "../components/css/ArecaLifecycle.css";
import AOS from "aos";
import { useEffect } from "react";
import cut from "../assets/process/cut.png"
import collect from "../assets/process/collect.png"
import dry from "../assets/process/dry.png"
import pack from "../assets/process/pack.png"
import wash from "../assets/process/wash.png"


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
    image: collect
  },
  {
  id: 5,
  icon: <FaLeaf />,
  title: "SUN DRYING PROCESS",
  description:
    "Collected leaves are naturally sun-dried to remove moisture while preserving strength and texture.",
  image: dry
},
{
  id: 6,
  icon: <FaIndustry />,
  title: "CUTTING & TRIMMING",
  description:
    "Dried leaves are precisely trimmed and cut into required sizes before molding begins.",
  image: cut
},
  {
    id: 3,
    icon: <FaIndustry />,
    title: "ECO-MANUFACTURING",
    description:
      "Leaves are washed, steam-pressed and heat-molded into durable shapes — 100% chemical-free.",
      image: wash,
    
  },
{
  id: 7,
  icon: <FaHandHolding />,
  title: "HEAT PRESS MOLDING",
  description:
    "Leaves are pressed under high temperature molds to form plates, bowls, and trays with strong durability.",
  image: "https://rsmarecaplates.com/infrastructure/machine.jpg"
},
 {
    id: 4,
    icon: <FaCheckCircle />,
    title: "QUALITY CONTROL",
    description:
      "Each product undergoes UV sterilization and strict quality checks before packaging.",
    image: "https://miro.medium.com/v2/resize:fit:736/1*jVc9zOREBsCNFMcqzZCJhg.jpeg",
  },
{
  id: 8,
  icon: <FaCheckCircle />,
  title: "PACKAGING & DISPATCH",
  description:
    "Finished products are hygienically packed and dispatched to retailers and export markets.",
  image: pack
}
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
    <section className="areca-section"  style={{paddingTop:"40px"}}>
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