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
<div className="text-center mb-4 mt-3">

  <a href="#" className="me-3 text-white fs-5">
    <FaFacebookF />
  </a>

  <a href="#" className="me-3 text-white fs-5">
    <FaInstagram />
  </a>

  <a href="#" className="me-3 text-white fs-5">
    <FaLinkedin />
  </a>

  <a  href="#" className="text-white fs-5">
  <FaXTwitter />
</a>

</div>

          </Col>

          {/* Quick Links */}

          <Col md={3} className="mb-4">

            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="footer-links">

              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/products" className="text-white">Products</Link></li>
              <li><Link to="/about" className="text-white">About Us</Link></li>
           

            </ul>

          </Col>

          {/* Contact Info */}

          <Col md={3} className="mb-4">

            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p>
              <FaEnvelope className="me-2" />
              info@multirisingexports.com
            </p>

            <p>
             <FaPhone style={{ transform: "rotate(90deg)", marginRight: "8px" }} />
              +91 76192 10277
            </p>

            <p>
              <FaMapMarkerAlt className="me-2" />
              Karnataka, India
            </p>

          </Col>

          {/* Policies */}

          <Col md={3} className="mb-4">

            <h5 className="fw-bold mb-3">Legal</h5>

            <ul className="footer-links">

              <li><Link to="/privacy-policy" className="text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-white">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-white">Refund Policy</Link></li>

            </ul>

          </Col>

        </Row>

        {/* Social Media */}

      

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