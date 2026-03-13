import { Container } from "react-bootstrap";
import { useEffect } from "react";

const RefundPolicy = () => {
      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="policy-page py-5">
      <Container>
        <h1 className="main-heading mb-4">Refund Policy</h1>

        <p>
          At Multirising Exports, we ensure quality products. If you are not
          satisfied with your purchase, please review our refund policy below.
        </p>

        <h5>Returns</h5>
        <p>
          Returns are accepted within 7 days of delivery if the product is
          damaged or defective.
        </p>

        <h5>Refund Process</h5>
        <p>
          Once the returned product is inspected, we will notify you of the
          approval or rejection of your refund.
        </p>

        <h5>Refund Method</h5>
        <p>
          Approved refunds will be processed to the original payment method
          within 5–7 business days.
        </p>

        <h5>Contact</h5>
        <p>
          For refund requests, please contact us at:
          <br />
          Email: info@multirisingexports.com
        </p>
      </Container>
    </div>
  );
};

export default RefundPolicy;