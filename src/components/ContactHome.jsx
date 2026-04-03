import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  const API_URL = "https://multirising.vercel.app";

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
        alert("Failed to send message");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light">
  <section className="contact-section py-5">
  <Container>
    <Row className="g-4 align-items-center">

      {/* LEFT SIDE (INFO) */}
      <Col md={6}>
        <div className="contact-info p-4">
          <h2 className="fw-bold mb-3 text-success">
            Let’s Connect With Us
          </h2>

          <p className="text-muted mb-4">
            Have questions about our eco-friendly products or bulk orders?
            Reach out to us anytime — we’re happy to help you.
          </p>

          <div className="mb-3">
            <FaMapMarkerAlt className="me-2 text-success" />
            Bengaluru, Karnataka - 560070
          </div>

          <div className="mb-3">
            <FaPhoneAlt className="me-2 text-success" />
            +91 76192 10277
          </div>

          <div className="mb-3">
            <FaEnvelope className="me-2 text-success" />
            support@multirisingexports.com
          </div>
        </div>
      </Col>

      {/* RIGHT SIDE (FORM) */}
      <Col md={6}>
        <Card className="contact-card p-4 border-0 rounded-4">

          {success && (
            <p className="text-success">✅ Message sent successfully!</p>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mb-3 input-field"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-3 input-field"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-3 input-field"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <Form.Control
              className="mb-3 input-field"
              as="textarea"
              rows={4}
              name="message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="w-100 send-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        </Card>
      </Col>

    </Row>
  </Container>
</section>
    </section>
  );
}