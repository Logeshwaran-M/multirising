import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-bg">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={5}>
            <Card className="auth-card border-0">
              <Card.Body>
                <h2 className="text-center fw-bold mb-4 text-dark">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <Form>
                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        className="custom-input"
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      className="custom-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="custom-input"
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} />:  <EyeOff size={18} /> }
                      
                    </span>
                  </Form.Group>

                  <Button className="auth-btn w-100">
                    {isLogin ? "Login" : "Register"}
                  </Button>
                </Form>

                <div className="text-center mt-4 text-dark">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <span
                    className="toggle-link"
                    onClick={() => setIsLogin(!isLogin)}
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