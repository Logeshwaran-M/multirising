import heroImage from "../assets/palm.jpg"; // your background image
import { Navbar, Nav, Container } from "react-bootstrap";

const PortfolioBanner = () => {
  return (<>
    <section
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
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
        <h1 className="fw-bold">PRODUCT PORTFOLIO</h1>

        {/* Small underline */}
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
           <Container className="text-center py-5  rounded-4 ">
        <h2 className="fw-bold mb-3 text-primary">
         Product Portfolio
        </h2>
        <p className="text-muted mb-0 px-md-5">
          Multirising Exports is dedicated to providing premium products to
          customers worldwide. We ensure quality, reliability, and excellence
          in every product we export.
          Areca catechu (areca palm tree). They’re also commonly called areca leaf plates or
          palm leaf plates. Areca leaf plates are an earth conscious choice for single-use disposables.
          There have no chemical polish or wax finish on the plates just pure palm leaf. Unlike wood plates, no trees are ever cut down  using only water, heat, and pressure in the manufacturing process.  With a woodlike appearance, areca leaf plates add a touch of 
          nature to any dining experience, making them a great substitute  during formal and casual events.
        </p>
      </Container>


         <Container className="py-5">
      <h3 className="fw-bold mb-4 text-center text-primary">Our Eco-Friendly Process</h3>

      <ul className="list-group  shadow-sm rounded-3">
        <li className="list-group-item border-0 py-3">
          🌿 Naturally fallen areca palm leaves are collected
        </li>
        <li className="list-group-item border-0 py-3">
          🌿 Washed and heat-pressed into different shapes (plates, bowls, trays)
        </li>
        <li className="list-group-item border-0 py-3">
          🌿 No chemicals, coatings, or additives are used
        </li>
      </ul>
    </Container>

    <div class="container my-5">
  <div class="table-responsive">
    <table class="table table-bordered text-center align-middle">
      <thead class="table-light">
        <tr>
          <th>Features</th>
          <th>Areca Leaf Plates</th>
          <th>Plastic/Styrofoam</th>
        </tr>
      </thead>
      <tbody>
        <tr>
           <td><b>Meterial</b></td>
          <td>Fallen leaves (Renewable)</td>
          <td>Petroleum-based (Non-renewable)</td>
        </tr>
        <tr>
            <td><b>Chemicals</b></td>
          <td>Zero chemicals</td>
          <td>BPA, Phthalates, etc.</td>
        </tr>
        <tr>
            <td><b>Heat Resistance</b></td>
          <td>High (Microwave safe)</td>
          <td>Low (Releases toxins)</td>
        </tr>
        <tr>
            <td><b>Decompotion</b></td>
          <td>2–3 months</td>
          <td>500+ years</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      <Container className="py-5">
      <h3 className="fw-bold mb-4 text-center text-primary">Uses</h3>

      <ul className="list-group shadow-sm rounded-4">
        <li className="list-group-item border-0 py-3">
          <strong>Parties and Events:</strong> Perfect for serving food at birthdays, weddings, family gatherings, sustainable home use, and religious functions.
        </li>

        <li className="list-group-item border-0 py-3">
          <strong>Catering Services:</strong> A sustainable option for catering businesses looking to reduce their environmental impact.
        </li>

        <li className="list-group-item border-0 py-3">
          <strong>Everyday Use:</strong> Great for picnics, barbecues, and outdoor dining where disposable tableware is needed.
        </li>

        <li className="list-group-item border-0 py-3">
          <strong>Restaurants & Eco-Conscious Cafés:</strong> Ideal for businesses promoting sustainable dining solutions.
        </li>
      </ul>
    </Container>

    
     </> 
  );
};

export default PortfolioBanner;