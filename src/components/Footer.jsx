import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png"; // add your logo path
import "./css/footer.css"

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">
      <Container>
        <Row>

          {/* Company Info */}
          <Col md={4} className="mb-4">
          <div >
              <img 
              className="bg-light footer-logo "
                src={logo} 
                alt="Multirising Exports Logo" 
                style={{ width: "245px", marginRight: "10px" }} 
              />
          </div>
          <p className="footer-text mt-2">
  Premium eco-friendly areca leaf products for a sustainable future.
</p>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p><FaEnvelope className="me-2" /> info@multirisingexports.com</p>
            <p><FaPhone className="me-2" /> +91 76192 10277</p>
          </Col>

          {/* Address */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Address</h5>
            <p><FaMapMarkerAlt className="me-2" /> Karnataka, India</p>
          </Col>

        </Row>

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