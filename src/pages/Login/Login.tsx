
import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/authContext";
import ErrorAlert from "../../components/ErrorAlert";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user, error, login} = useAuthContext();

  useEffect(() => {
    if (user) {
        navigate("/dashboard");
      }
    });
   [user];


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Email: ${email}, Password: ${password}`);
    await login(email, password)
    setLoading(false);
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
             <ErrorAlert errorMessage={error}/>
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
