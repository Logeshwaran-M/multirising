import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Terms = () => {

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="policy-page py-5">
      <Container>
        <h1 className="main-heading mb-4">Terms & Conditions</h1>

        <p>
          By accessing and using the Multirising Exports website, you agree to
          comply with the following terms and conditions.
        </p>

        <h5>Use of Website</h5>
        <p>
          The content of this website is for general information and shopping
          purposes only. Unauthorized use of this website may result in legal action.
        </p>

        <h5>Product Information</h5>
        <p>
          We strive to provide accurate product descriptions and pricing.
          However, errors may occur and we reserve the right to correct them.
        </p>

        <h5>Orders</h5>
        <p>
          We reserve the right to refuse or cancel orders at our discretion,
          including cases of incorrect pricing or product availability.
        </p>

        <h5>Intellectual Property</h5>
        <p>
          All content on this website including images, logos, and text belongs
          to Multirising Exports and may not be used without permission.
        </p>
      </Container>
    </div>
  );
};

export default Terms;