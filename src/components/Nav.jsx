import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="shadow-sm border-bottom flex-column">

      {/* 🔹 Row 1 → Logo + Icons */}
      <Container className="d-flex align-items-center justify-content-between ">

        {/* Empty div for left balance (optional) */}
        <div style={{ width: "40px" }}></div>

        {/* Center Logo */}
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          <img
            src={logo}
            alt="Company Logo"
            height="90"
          />
        </Navbar.Brand>

        {/* Right Icons */}
        <Nav className="d-flex flex-row gap-4">
          <Nav.Link className="nav-link-custom">
            <FaUser size={20} />
          </Nav.Link>
          <Nav.Link className="nav-link-custom">
            <FaShoppingCart size={20} />
          </Nav.Link>
        </Nav>

      </Container>

      {/* 🔹 Row 2 → Center Links */}
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center pb-3"
        >
          <Nav>
            <Nav.Link   className={({ isActive }) =>
    isActive ? "custom-link active-link" : "custom-link  nav-link-custom px-4"
  } as={Link} to="/">
              MRE Finds
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={({ isActive }) =>
    isActive ? "custom-link active-link" : "custom-link  nav-link-custom px-4"
  }>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/abroad"className={({ isActive }) =>
    isActive ? "custom-link active-link" : "custom-link  nav-link-custom px-4"
  }>
              Send Bulk Gifts to Abroad
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio" className={({ isActive }) =>
    isActive ? "custom-link active-link" : "custom-link  nav-link-custom px-4"
  }>
              Portfolio
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={({ isActive }) =>
    isActive ? "custom-link active-link" : "custom-link  nav-link-custom px-4"
  }>
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
};

export default NavbarComponent;