import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">

      <Container>

        <Row>

          {/* Company Info */}

          <Col md={3} className="mb-4">

            <img
              className="bg-light footer-logo"
              src={logo}
              alt="Multirising Exports Logo"
              style={{ width: "200px" }}
            />

           {/* Social Media */}
 <p className="mt-4 fs-5 mx-auto description-text">
  Eco-friendly areca leaf products made from natural leaves. <br />
  Designed for quality, durability, and elegant serving.
</p>
          </Col>

          {/* Quick Links */}

          <Col md={2} className="mb-4 ">

            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="footer-links">

              <li><Link to="/" className="text-white fs-5">Home</Link></li>
              <li><Link to="/products" className="text-white fs-5">Products</Link></li>
              <li><Link to="/about" className="text-white fs-5">About Us</Link></li>
                <li><Link to="/blog" className="text-white fs-5">Blog</Link></li>
           

            </ul>

          </Col>

          {/* Contact Info */}

          <Col md={4} className="mb-4 ">

            <h5 className="fw-bold mb-3 ">Contact Us</h5>

            <p className="fs-5">
              <FaEnvelope className="me-2" />
             support@multirisingexports.com
            </p>

            <p className="fs-5">
             <FaPhone style={{ transform: "rotate(90deg)", marginRight: "8px" }} />
              +91 76192 10277
            </p>

            <p className="fs-5">
              <FaMapMarkerAlt className="me-2" />

             Bengaluru, Karnataka - 560070

            </p>

          </Col>

          {/* Policies */}

          <Col md={3} className="mb-4">

            <h5 className="fw-bold mb-3">Legal</h5>

            <ul className="footer-links">

              <li><Link to="/privacy-policy" className="text-white fs-5">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white fs-5">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-white fs-5">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-white fs-5">Refund Policy</Link></li>

            </ul>

          </Col>

        </Row>

        {/* Social Media */}

      <div className="text-center mb-4 mt-3">

  <a href="#" className="me-3 text-white fs-5">
    <FaFacebookF />
  </a>

  <a href="https://www.instagram.com/multirisingexports?igsh=MTYwNW5qZjY5d3lycQ==" className="me-3 text-white fs-5">
    <FaInstagram />
  </a>

  <a href="#" className="me-3 text-white fs-5">
    <FaLinkedin />
  </a>

  <a  href="#" className="text-white fs-5">
  <FaXTwitter />
</a>

</div>

        <hr className="footer-line" />

    <div className="container border-top py-3">
  <div className="row align-items-center">
    
    {/* Left Side */}
    <div className="col-md-6 text-center text-md-start">
      <small className="text-white">
        © {new Date().getFullYear()} Multirising Exports. All Rights Reserved.
      </small>
    </div>

    {/* Right Side */}
    <div className="col-md-6 text-center text-md-end">
      <small className="text-white">
        Powered By{" "}
        <a 
          href="https://www.innomatricstech.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fw-bold text-decoration-none text-white"
        >
          Innomatrics Tech
        </a>
      </small>
    </div>

  </div>
</div>

      </Container>

    </footer>
  );
};

export default Footer;
