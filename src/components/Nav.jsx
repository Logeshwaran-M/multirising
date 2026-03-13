import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaUser, FaShoppingCart, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../components/CartContext";
import i18n from "../i18n";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import UserMenu from "./UserMenu";
import LanguageTranslator from "./LanguageTranslate";

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

  return (
   
 <div>

  {/* TOP BAR */}
  <div className="topbar">
    <Container className="d-flex justify-content-between align-items-center">
      <div><strong>Multirising Exports</strong></div>

      <div className="d-flex gap-3">
        <span>📧 multirisingexports@gmail.com</span>
        <span>|</span>
        <span>📞 +91 98765 43210</span>
      </div>

     <LanguageTranslator/>
    </Container>
  </div>


      <Navbar
        expand="lg"
        fixed="top"
        className="shadow-sm border-bottom bg-white flex-lg-column"
      >

        {/* TOP HEADER BAR */}
      
      

        {/* LOGO ROW */}

        <Container className="d-flex align-items-center justify-content-between py-2">

          <div style={{ width: "200px" }}></div>

          <Navbar.Brand as={Link} to="/" className="mx-auto">
            <img src={logo} alt="Company Logo" height="90" />
          </Navbar.Brand>

          <div className="d-flex align-items-center ms-auto">

            <Nav className="d-flex flex-row gap-3 align-items-center">

              {/* USER LOGIN / DROPDOWN */}

              {user ? (
                <NavDropdown
                  title={<FaUser size={20} />}
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <UserMenu />
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/auth" className="icon-hover">
                  <FaUser size={20} />
                </Nav.Link>
              )}

              {/* CART */}

              <Nav.Link
                as={NavLink}
                to="/cart"
                className="icon-hover position-relative"
              >
                <FaShoppingCart size={20} />

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

              <div>
                <Navbar.Toggle />
              </div>

            </Nav>

          </div>

        </Container>

        {/* SECOND NAVBAR ROW */}

        <Container>

          <Navbar.Collapse className="justify-content-center pb-3">

            <Nav className="fw-semibold">

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