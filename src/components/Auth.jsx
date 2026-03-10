import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Auth() {

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ---------------- CHECK LOGIN ---------------- */

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/"); // redirect to home
    }
  }, [navigate]);

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- LOGIN / REGISTER ---------------- */

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (isLogin) {

        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        localStorage.setItem("user", JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName
        }));

        alert("Login Successful 🎉");

        navigate("/");

      } else {

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: formData.name,
        });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          createdAt: serverTimestamp(),
        });

        localStorage.setItem("user", JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: formData.name
        }));

        alert("Registration Successful 🎉");

        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="auth-bg">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={5}>
            <Card className="auth-card border-0 shadow">
              <Card.Body>

                <h2 className="text-center fw-bold mb-4 text-dark">
                  {isLogin ? t("welcome") : t("createAccount")}
                </h2>

                <Form onSubmit={handleAuth}>

                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder={t("email")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">

                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={t("password")}
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <span
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </span>

                  </Form.Group>

                  <Button
                    type="submit"
                    className="auth-btn w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : isLogin ? t("login") : t("register")}
                  </Button>

                </Form>

                <div className="text-center mt-4 text-dark">

                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}

                  <span
                    className="toggle-link"
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ cursor: "pointer", fontWeight: "600" }}
                  >
                    {isLogin ? "Register" : "Login"}
                  </span>

                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;