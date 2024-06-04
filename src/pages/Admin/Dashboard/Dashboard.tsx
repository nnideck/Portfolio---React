import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);

  function logout() {
    signOut(auth);
  }

  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [presentation, setPresentation] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aqui você pode fazer o que quiser com os valores dos campos do formulário
    console.log("Greeting:", greeting);
    console.log("Name:", name);
    console.log("Presentation:", presentation);
  };

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <Container>
      <Container className="dashboard-content">
        <Row className="justify-content-md-center">
        <br />
        <br />
        <br />
          <Sidebar />
          
          <Col md={7} className="dashboard-col"></Col>
          
          <Form onSubmit={handleSubmit}>
            <Button variant="primary" type="button" onClick={logout}>
            Logout
          </Button>
          <br />
          <br />
            <Form.Group controlId="formGreeting">
              <Form.Label className="login_label">Greeting</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a greeting"
                //*Pq aqui o onchange não vem antes? Se ele seta o valor do greeting..
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
              />
            </Form.Group>
            <br />
    
            <Form.Group controlId="formPresentation">
              <Form.Label className="login_label">Presentation</Form.Label>
              <Form.Control
               type="text"
                placeholder="Enter a presentation"
                value={presentation}
                onChange={(e) => setPresentation(e.target.value)}
              />
            </Form.Group>
        
            <br />
            <Form.Group controlId="formName">
              <Form.Label className="login_label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </Form>
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
