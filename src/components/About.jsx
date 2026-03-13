import heroImage from "../assets/palm.jpg";
import plate from "../assets/plates.webp"
import { Row,Col,Image, Container } from "react-bootstrap";
import { useEffect } from "react";


export default function About(){
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
      {/* 🔹 Hero Section Only */}
      <section
        style={{
          paddingTop:'40px',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
        }}
        className="home-page"
      >
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
  ABOUT US
</h1>

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

      {/* 🔹 About Content Section */}
      <section className="py-5">
        <div className="text-center rounded-4">
        <h2
  className="fw-bold brand-title"
  data-aos="fade-up"
>
  About Us
</h2>

<p
  className="text-muted px-md-5"
  data-aos="fade-up"
  data-aos-delay="200"
>
           At Multirising Exports, we are committed to delivering eco-friendly and sustainable alternatives to traditional disposable tableware. Our premium areca palm leaf products are crafted from naturally fallen leaves, ensuring zero harm to trees and the environment.

We specialize in manufacturing high-quality biodegradable plates, bowls, and trays that are durable, chemical-free, and completely compostable. Every product is carefully washed and heat-pressed without the use of any chemicals, coatings, or additives, preserving the natural strength and texture of the leaf.

Our mission is to promote sustainable living by providing environmentally responsible solutions for homes, catering businesses, restaurants, and global export markets. With a focus on quality, hygiene, and innovation, we ensure that every product meets international standards.

At Multirising Exports, sustainability is not just a product feature — it is our responsibility towards a greener future.
          </p>
        </div>
      </section>

      {/* 🔹 Quality Section */}
      <Container className="py-5">
        <Row className="align-items-center">
       <Col
  md={6}
  className="mb-4 mb-md-0"
  data-aos="fade-right"
>
  <Image src={plate} fluid rounded className="shadow" />
</Col>

        <Col md={6} data-aos="fade-left">
            <div className="mb-4">
            <h4 className="fw-bold brand-title">Our Quality Assurance</h4>
              <p className="text-muted">
               Being a quality oriented firm, we channelize all our efforts and endeavors to maintain consistent quality in our entire areca palm leafes.We assure that the offered products 
               are hygienically processed in adherence to the international standards of quality
              </p>
            </div>

            <div>
            <h4 className="fw-bold brand-title">Client Satisfaction</h4>
              <p className="text-muted">
               We are a client conscious organization that strives hard to provide the clients maximum level of contentment. Our industry experts maintain close proximity with the clients to comprehend their exact requirements and accordingly provide desired products. By following ethical business policies and maintain a level of transparency in all our dealings, we have been able to retain our clients with repetitive orders. Owing to timely delivery, easy payment options, qualitative gamut
                and competitive pricing, we have become the ideal choice of our valuable clients.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}  
    
