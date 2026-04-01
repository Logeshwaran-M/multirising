import heroImage from "../assets/palm.jpg";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactUs() {
  const API_URL =
    window.location.hostname === "localhost"
      ? "https://multirising.vercel.app"
      : "https://multirising.vercel.app";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/send-bulk-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "contact" }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "320px",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1 className="fw-bold display-5">Contact Us</h1>
          <p className="text-light">We’d love to hear from you</p>
        </div>
      </section>

      {/* Form + Info Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            {/* Contact Form */}
            <Col md={6}>
              <Card className="p-4 shadow-lg border-0 rounded-4">
                <h3 className="fw-bold mb-3">Get in Touch</h3>

                {success && (
                  <p className="text-success">✅ Message sent successfully!</p>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control
                    className="mb-3"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control
                    className="mb-3"
                    type="text"
                    name="phone"
                    placeholder="Phone (+CountryCode)"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <Form.Control
                    className="mb-3"
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-100 rounded-pill fw-bold"
                    style={{ backgroundColor: "#198754", border: "none" }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Contact Info */}
            <Col md={6}>
              <Card className="p-4 shadow-lg border-0 rounded-4 mb-4">
                <h4 className="fw-bold mb-3">
                  <FaMapMarkerAlt className="me-2 text-success" /> Our Address
                </h4>
                <p>No. 14, 22nd Main Road, 11th Cross</p>
                <p>Raghavendra Layout, Padmanabhanagar</p>
                <p>Bengaluru, Karnataka - 560070</p>

                <hr />

                <p>
                  <FaPhoneAlt className="me-2 text-success" /> +91 76192 10277
                </p>
                <p>
                  <FaEnvelope className="me-2 text-success" /> support@multirisingexports.com
                </p>

                <a
                  href="https://www.google.com/maps?q=No.14,22nd Main Road,11th Cross,Raghavendra Layout,Padmanabhanagar,Bengaluru,560070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success mt-2"
                >
                  View on Map
                </a>
              </Card>

              {/* Map */}
            </Col>
          </Row>
          <Row>

            <Card className="shadow-lg border-0 rounded-4 overflow-hidden mt-3">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps?q=No.14,22nd Main Road,11th Cross,Raghavendra Layout,Padmanabhanagar,Bengaluru,560070&output=embed"
                ></iframe>
              </Card>
          </Row>
        </Container>
      </section>
    </>
  );
}
