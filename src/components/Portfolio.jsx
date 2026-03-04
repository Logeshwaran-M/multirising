import heroImage from "../assets/palm.jpg"; // your background image
 import { Container, Row, Col } from "react-bootstrap";
 import eco from "../assets/eco.jpg"
 import tining from "../assets/tining.webp"
 import { useEffect } from "react";
 import AOS from "aos";

const PortfolioBanner = () => {

  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
}, []);
  return (<>
    <section
      style={{
        paddingTop:"40px",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        position: "relative",
      }} className="home-page"
    >
      {/* Dark Overlay */}
    <div
  data-aos="zoom-in"
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
        <h1 className="fw-bold">PRODUCT PORTFOLIO</h1>

        {/* Small underline */}
        <div
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "white",
            margin: "10px auto",
          }}
        ></div>
      </div>
    </section>
        <Container
  className="text-center py-5 rounded-4"
  data-aos="fade-up"
>
       <h2 className="fw-bold  d-inline-block border-bottom border-3 border-primary pb-2">
         Product Portfolio
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


    

<Container className="py-5 card " >
  <Row className="align-items-center" data-aos="fade-right">

    {/* Left Side Image */}
   

    {/* Right Side Content */}
    <Col md={6}>
      <h3 className="fw-bold d-inline-block border-bottom border-3 border-primary pb-2">
        Our Eco-Friendly Process
      </h3>

      <ul className="list-group shadow-sm rounded-3 mt-3">
        <li className="list-group-item border-0 py-3">
          🌿 Naturally fallen areca palm leaves are collected
        </li>
        <li className="list-group-item border-0 py-3">
          🌿 Washed and heat-pressed into different shapes (plates, bowls, trays)
        </li>
        <li className="list-group-item border-0 py-3">
          🌿 No chemicals, coatings, or additives are used
        </li>
      </ul>
    </Col>

    <Col md={6} className="mb-4 mb-md-0" data-aos="zoom-in" data-aos-delay="200">
      <img
        src={eco}
       style={{ height: "350px", objectFit: "cover", width: "70%" }}
        alt="Eco Friendly Process"
        className="img-fluid rounded"
      />
    </Col>

  </Row>
</Container>



<Container className="py-5 text-center">
  <h3 className="fw-bold border-bottom border-3 border-success d-inline-block pb-2">
    Why Choose Our Areca Products?
  </h3>

  <Row className="mt-4">
 <Col md={4} data-aos="fade-up" data-aos-delay="100">
      <div className="p-4 shadow rounded-4 h-100 bg-light">
        <h5>🌍 100% Biodegradable</h5>
        <p className="text-muted">
          Completely decomposes within 60–90 days without harming the environment.
        </p>
      </div>
    </Col>

    <Col md={4} data-aos="fade-up" data-aos-delay="300">
      <div className="p-4 shadow rounded-4 bg-light h-100">
        <h5>🔥 Heat & Liquid Resistant</h5>
        <p className="text-muted">
          Suitable for hot curries, soups, and oily foods without leakage.
        </p>
      </div>
    </Col>

    <Col md={4} data-aos="fade-up" data-aos-delay="500">
      <div className="p-4 shadow rounded-4 bg-light h-100">
        <h5>🌱 Chemical Free</h5>
        <p className="text-muted">
          No polish, wax, bleach, or synthetic additives used.
        </p>
      </div>
    </Col>
  </Row>
</Container>
   

  <div className="container my-5" data-aos="fade-up">
  <div className="table-responsive">
    <table className="table table-bordered text-center align-middle">
      <thead className="table-light">
        <tr>
          <th className="text-success">Features</th>
          <th className="text-success">Areca Leaf Plates</th>
          <th className="text-success">Plastic/Styrofoam</th>
        </tr>
      </thead>
      <tbody>
        <tr>
           <td><b>Material</b></td>
          <td>Fallen leaves (Renewable)</td>
          <td>Petroleum-based (Non-renewable)</td>
        </tr>
        <tr>
            <td><b>Chemicals</b></td>
          <td>Zero chemicals</td>
          <td>BPA, Phthalates, etc.</td>
        </tr>
        <tr>
            <td><b>Heat Resistance</b></td>
          <td>High (Microwave safe)</td>
          <td>Low (Releases toxins)</td>
        </tr>
        <tr>
            <td><b>Decompotion</b></td>
          <td>2–3 months</td>
          <td>500+ years</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<Container className="py-5">
  <Row className="align-items-center">

    {/* Image with Text Overlay */}
<Col md={6} data-aos="fade-right">
      <div style={{ position: "relative" }}>
        <img
          src={tining}
          alt="Areca plates usage"
          className="img-fluid rounded shadow"
          style={{ height: "350px", objectFit: "cover", width: "100%" }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "20px"
          }}
        >
          <div>
            <h3 className="fw-bold">Eco-Friendly Uses</h3>
            <p>Perfect for Events, Catering & Sustainable Dining</p>
          </div>
        </div>
      </div>
    </Col>

    {/* Right Side Content */}
   <Col md={6} data-aos="fade-left">

      <ul className="list-group shadow-sm rounded-4 mt-3">
        <li className="list-group-item border-0 py-3">
          <strong>Parties and Events:</strong> Perfect for birthdays, weddings, family gatherings, and religious functions.
        </li>
        <li className="list-group-item border-0 py-3">
          <strong>Catering Services:</strong> Sustainable option for catering businesses.
        </li>
        <li className="list-group-item border-0 py-3">
          <strong>Everyday Use:</strong> Great for picnics, barbecues, and outdoor dining.
        </li>
        <li className="list-group-item border-0 py-3">
          <strong>Restaurants & Eco Cafés:</strong> Ideal for eco-conscious dining businesses.
        </li>
      </ul>
    </Col>

  </Row>
</Container>
    
     </> 
  );
};

export default PortfolioBanner;
