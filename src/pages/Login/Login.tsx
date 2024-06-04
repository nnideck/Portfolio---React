import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);
  const [_error, setError] = useState("");

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);


  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Email: ${email}, Password: ${password}`);
    signInWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user", user);
      navigate("/dashboard");
    
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        setError("Usuário não localizado");
      })
      
      .finally(() => {
        setLoading(false);
      });
  };

  

  return (
    <Container>
      <Container className="login-content">
        <Row className="justify-content-md-center">
          <Col md={7} className="login-col">
            <br />
            <br />
            <br />
            <br />
            <h2 className="text-center">Login</h2>
            <br />
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="login_label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  //* pq disabled {loading}?
                  disabled={loading}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="login_label">Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" disabled={loading}>
                Login
              </Button>
              <Alert variant="danger" hidden={_error == ""}>{_error}</Alert>
              <br />
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
