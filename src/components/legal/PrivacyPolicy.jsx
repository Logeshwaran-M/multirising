import { Container } from "react-bootstrap";
import { useEffect } from "react";

const PrivacyPolicy = () => {

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="policy-page py-5">
      <Container>
        <h1 className="main-heading mb-4">Privacy Policy</h1>

        <p>
          At Multirising Exports, we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard your information when you visit our
          website.
        </p>

        <h5>Information We Collect</h5>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and shipping address when you place an order or contact us.
        </p>

        <h5>How We Use Your Information</h5>
        <ul>
          <li>To process and deliver your orders</li>
          <li>To communicate with you about products and services</li>
          <li>To improve our website and customer experience</li>
        </ul>

        <h5>Data Protection</h5>
        <p>
          We implement security measures to protect your personal information.
          However, no internet transmission is completely secure.
        </p>

        <h5>Contact Us</h5>
        <p>
          If you have any questions regarding this Privacy Policy, contact us at:
          <br />
          Email: info@multirisingexports.com
        </p>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;