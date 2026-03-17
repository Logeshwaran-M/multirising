import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../components/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import UserMenu from "./UserMenu";
import LanguageTranslator from "./LanguageTranslate";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const NavbarComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const greenIconStyle = { color: "green" }; // reusable style for all icons

  return (
    <div>
      {/* TOP BAR */}
      <div className="topbar d-lg-flex  d-none ">
        <Container className="d-flex justify-content-between align-items-center">
       
          <div className="d-flex gap-3">
            <span>  <FaEnvelope/>  multirisingexports@gmail.com</span>
            <span> <FaEnvelope/>  info@multirisingexports.com</span>
            <span> <FaEnvelope/>  infomultirisingexports@gmail.com</span>
            <span>    <FaPhone style={{ transform: "rotate(90deg)", marginRight: "8px" }} />  +91 76192 10277</span>
          </div>
          <LanguageTranslator />
        </Container>
      </div>

      <Navbar expand="lg" fixed="top" className="shadow-sm border-bottom bg-white flex-lg-column">

        {/* MOBILE TOP ROW: Logo + Cart + User */}
        <Container className="d-flex d-lg-none justify-content-between align-items-center py-2">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Company Logo" height="60" />
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <Nav.Link as={NavLink} to="/cart" className="position-relative p-0">
              <FaShoppingCart size={20} style={greenIconStyle} />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "10px" }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* User */}
            {user ? (
              <NavDropdown
                title={<FaUser size={20} style={greenIconStyle} />}
                id="user-dropdown-mobile"
                align="end"
              >
                <UserMenu />
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/auth" className="p-0">
                <FaUser size={20} style={greenIconStyle} />
              </Nav.Link>
            )}
          </div>
        </Container>

        {/* MOBILE SECOND ROW: Navbar Toggle */}
        <Container className="d-flex d-lg-none justify-content-end">
          <Navbar.Toggle />
        </Container>

        {/* DESKTOP LOGO ROW */}
        <Container className="d-none d-lg-flex align-items-center justify-content-between py-2">
          <div style={{ width: "200px" }}></div>
          <Navbar.Brand as={Link} to="/" className="mx-auto">
            <img src={logo} alt="Company Logo" height="90" />
          </Navbar.Brand>

          <div className="d-flex align-items-center ms-auto">
            <Nav className="d-flex flex-row gap-3 align-items-center">
              {user ? (
                <NavDropdown
                  title={<FaUser size={20} style={greenIconStyle} />}
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <UserMenu />
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/auth" className="icon-hover">
                  <FaUser size={20} style={greenIconStyle} />
                </Nav.Link>
              )}

              <Nav.Link
                as={NavLink}
                to="/cart"
                className="icon-hover position-relative"
              >
                <FaShoppingCart size={20} style={greenIconStyle} />
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "10px" }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              <Navbar.Toggle />
            </Nav>
          </div>
        </Container>

        {/* NAV LINKS ROW */}
        <Container>
          <Navbar.Collapse className="justify-content-center pb-3">
            <Nav className="fw-semibold flex-column flex-lg-row text-center text-lg-start">
              <Nav.Link as={NavLink} to="/" className="nav-item-custom px-4">
                MRE Finds
              </Nav.Link>

              <NavDropdown
                title="Products"
                id="products-dropdown"
                className="px-4 nav-item-custom"
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <NavDropdown.Item as={NavLink} to="/products">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/gallery">
                  Gallery
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/facilities">
                  Facilities
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/portfolio">
                  Product Portfolio
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/process" className="nav-item-custom px-4">
                Process
              </Nav.Link>

              <Nav.Link as={NavLink} to="/abroad" className="nav-item-custom px-4">
                Send Bulk Gifts to Abroad
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" className="nav-item-custom px-4">
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </div>
  );
};

export default NavbarComponent;