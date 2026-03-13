import { useEffect } from "react";
import { Container } from "react-bootstrap";

const ShippingPolicy = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="policy-page py-5">
      <Container>
        <h1 className="main-heading mb-4">Shipping Policy</h1>

        <p>
          Multirising Exports offers reliable shipping services for both domestic
          and international customers.
        </p>

        <h5>Order Processing</h5>
        <p>
          Orders are processed within 2–3 business days after payment confirmation.
        </p>

        <h5>Shipping Time</h5>
        <ul>
          <li>Domestic delivery: 3–7 business days</li>
          <li>International delivery: 7–15 business days</li>
        </ul>

        <h5>Shipping Charges</h5>
        <p>
          Shipping costs depend on location, order size, and shipping method
          selected during checkout.
        </p>

        <h5>Tracking</h5>
        <p>
          Once your order is shipped, tracking details will be shared via email
          or SMS.
        </p>
      </Container>
    </div>
  );
};

export default ShippingPolicy;