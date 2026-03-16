import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

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

            <p className="footer-text mt-3">
              Premium eco-friendly areca leaf products for a sustainable future.
              Delivering quality natural products worldwide.
            </p>

          </Col>

          {/* Quick Links */}

          <Col md={3} className="mb-4">

            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="footer-links">

              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
           

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
              <FaPhone className="me-2" />
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

              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>

            </ul>

          </Col>

        </Row>

        {/* Social Media */}

      

        <hr className="footer-line" />

        <div className="text-center">

          <small>
            © {new Date().getFullYear()} Multirising Exports. All Rights Reserved.
          </small>

        </div>

      </Container>

    </footer>
  );
};

export default Footer;