import heroImage from "../assets/palm.jpg";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

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
          paddingTop: "40px",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
        }}
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
          <h1 className="fw-bold">CONTACT US</h1>
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

      {/* Contact Form Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow-sm rounded-4">
                <h2 className="fw-bold text-center mb-4">Get in Touch</h2>

                {success && (
                  <p className="text-success text-center">
                    🎉 Your message has been sent successfully!
                  </p>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone (+CountryCode)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 fw-bold"
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
    </>
  );
}