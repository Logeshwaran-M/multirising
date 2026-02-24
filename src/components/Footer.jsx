import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <Container>
        <Row>

          {/* Company Info */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Multirising Exports</h5>
            <p className="text-muted">
              We manufacture and export premium quality areca palm leaf
              products that are eco-friendly, biodegradable, and
              chemical-free. Promoting sustainable living worldwide.
            </p>
          </Col>

        
          {/* Contact Info */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p><FaEnvelope className="me-2" /> info@multirisingexports.com</p>
            <p><FaPhone className="me-2" /> +91 76192 10277</p>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Address</h5>
            <p><FaMapMarkerAlt className="me-2" /> Karnataka, India</p>
          </Col>

        </Row>

        <hr className="border-secondary" />

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