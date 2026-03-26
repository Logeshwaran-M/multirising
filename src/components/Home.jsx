import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import service1 from "../assets/fsdelivery.jpg";
import service2 from "../assets/premium.webp";
import service3 from "../assets/exports.jpg";
import ShapesSection from "./ShapeSection";
import iso from "../assets/iso.webp";
import support from "../assets/support.jpg";
import leaf from "../assets/leaf.jpg";
import '../components/css/home.css'
import frame from "../assets/frame1.png"
import frame2 from "../assets/frame2.png"
import { useEffect } from "react";
import AOS from "aos";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
}, []);

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home-page">

      {/* HERO WITH OVERLAY */}
      <div className="hero-wrapper brand-hero ">
        <img src={heroImage} alt="Hero" className="hero-img" />
        <div className="hero-dark-overlay"></div>

   <div className="hero-overlay text-center" data-aos="zoom-in">

  <h1 className="hero-title">
    Premium Areca Leaf Products
  </h1>

  <p className="text-white">
   <b> Eco-friendly • Sustainable • Export Quality</b>
  </p>

  <button
    className="shop-btn mt-3"
    onClick={() => navigate("/products")}
  >
    Shop Now
  </button>

</div>
</div>

      

  <a
  href="https://wa.me/7619210277"
  className="whatsapp-float"
  target="_blank"
  rel="noreferrer"
>
  <FaWhatsapp />
</a>



      {/* ABOUT SECTION */}
      <Container className="text-center py-5" data-aos="fade-up">
        <h2 className="fw-bold brand-title">
          Welcome To Multirising Exports
        </h2>
        <p className="text-muted px-md-5 mt-2">
          Multirising Exports delivers premium Areca leaf plates worldwide.
          Our eco-friendly plates are made using only water, heat, and pressure.
          No chemicals. No tree cutting. Just sustainable nature-friendly products.
          Areca catechu (areca palm tree). They’re also commonly called areca leaf plates or palm leaf plates.
           Areca leaf plates are an earth conscious choice for single-use disposables. 
           There have no chemical polish or wax finish on the plates just pure palm leaf.
            Unlike wood plates, no trees are ever cut down  using only water, heat, and pressure in the manufacturing process.  
            With a woodlike appearance, areca leaf plates add a touch of nature to any dining experience, making them a 
            great substitute  during formal and casual events.
        </p>
      </Container>

<Container className="py-5 text-center">
  <Row className="g-4">

    <Col md={3} data-aos="fade-up">
      <div className="stat-box">
        <h2>50+</h2>
        <p>Products</p>
      </div>
    </Col>

    <Col md={3} data-aos="fade-up" data-aos-delay="100">
      <div className="stat-box">
        <h2>25+</h2>
        <p>Countries Exported</p>
      </div>
    </Col>

    <Col md={3} data-aos="fade-up" data-aos-delay="200">
      <div className="stat-box">
        <h2>10K+</h2>
        <p>Happy Customers</p>
      </div>
    </Col>

    <Col md={3} data-aos="fade-up" data-aos-delay="300">
      <div className="stat-box">
        <h2>100%</h2>
        <p>Eco Friendly</p>
      </div>
    </Col>

  </Row>
</Container>


      {/* FEATURED PRODUCTS */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">
          Featured Products
        </h2>

        <Row className="g-4 mt-3">
          {[1, 2, 3].map((item) => (
            <Col md={4} key={item}>
           <Card
  className="product-card shadow-sm border-0 brand-card-hover"
  data-aos="fade-up"
  data-aos-delay={item * 200}
>
                <Card.Img
                  variant="top"
                  src="https://agrileaf.in/wp-content/uploads/2024/04/7xm.xyz288434-1280x821.jpg"
                />
                <Card.Body>
                  <h6 className="fw-bold text-success">Areca Leaf Plate</h6>
                  <p className="text-muted">Eco-friendly disposable plate</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          className="shop-btn brand-btn mt-3"
          onClick={() => navigate("/products")}
        >
          Shop All Products →
        </Button>
      </Container>

      <div className="export-banner text-center">

<h2>Looking for Bulk Orders?</h2>

<p>
We export Areca leaf plates worldwide with premium packaging
and international quality standards.
</p>

<button
className="shop-btn mt-3"
onClick={()=>navigate("/abroad")}
>
Send Bulk Gifts Abroad
</button>

</div>

    

      {/* OUR SERVICES */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold brand-title">Our Services</h2>

        <Row className="g-4 mt-3">
          {[service1, service2, service3].map((img, i) => (
         <Col md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
              <div className="service-card shadow-sm p-3 brand-card-hover bg-white">
                <img src={img} alt="" className="rounded" />
                <h5 className="fw-bold mt-3 text-success">
                  {i === 0
                    ? "Fast Delivery"
                    : i === 1
                    ? "Premium Quality"
                    : "Global Export"}
                </h5>
                <p className="text-muted">
                  {i === 0
                    ? "Quick & safe delivery worldwide."
                    : i === 1
                    ? "Highest international quality standards."
                    : "Reliable exports across the globe."}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>


      <ShapesSection />


 <Container fluid className="p-0">
  <img
    src={frame2}
    alt="Banner"
    className="frame-banner"
  />
</Container>
      {/* WHY CHOOSE US */}
<Container className="py-5 text-center">
  <h2 className="fw-bold brand-title mb-4">Why Choose Multirising Exports</h2>

 <Row className="g-4 mt-3">

  {/* 1 */}
 <Col md={4} data-aos="zoom-in" data-aos-delay="200">
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
     <img src={leaf} alt="Eco Friendly" className="feature-img" />
      <h5 className="mt-3 text-success">🌱 100% Natural & Eco-Friendly</h5>
      <p className="text-muted">
        Our products are made from naturally fallen Areca leaves.
        No chemicals, no plastic, no tree cutting — completely
        biodegradable and compostable.
          Each plate is carefully cleaned and heat-pressed without 
        altering its natural texture, ensuring a safe and eco-conscious 
        dining experience for homes, events, and businesses.
      </p>
    
    </div>
  </Col>

  {/* 2 */}
 <Col md={4} data-aos="zoom-in" data-aos-delay="200">
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
    <img src={iso} alt="Export Quality" className="feature-img" />
      <h5 className="mt-3 text-success">🌍 International Export Standards</h5>
      <p className="text-muted">
        Manufactured under strict hygiene and quality control
        processes to meet global export requirements.
          Our production facility follows international compliance 
        measures, ensuring consistency, durability, and packaging 
        standards suitable for global markets.
      </p>
   
    </div>
  </Col>

  {/* 3 */}
  <Col md={4} data-aos="zoom-in" data-aos-delay="200">
    <div className="feature-box p-4 shadow-sm brand-card-hover h-100">
     <img src={support} alt="Trusted" className="feature-img" />
      <h5 className="mt-3 text-success">🤝 Trusted by Global Clients</h5>
      <p className="text-muted">
        We serve restaurants, wholesalers, and distributors
        worldwide with reliable service and long-term partnerships.
          Our commitment to timely delivery, transparent communication, 
        and consistent product quality has earned us trust across 
        multiple countries and industries.
      </p>
     
    </div>
  </Col>

</Row>
</Container>


    </section>
  );
};

export default HeroSection;
