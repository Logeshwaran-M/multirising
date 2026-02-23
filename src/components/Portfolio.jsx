import heroImage from "../assets/palm.jpg"; // your background image

const PortfolioBanner = () => {
  return (
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
  );
};

export default PortfolioBanner;