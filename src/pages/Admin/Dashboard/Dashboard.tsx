import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import Sidebar from "../../../components/Sidebar";
import { useForm } from "../../../Utils/Hooks/useForm";
import { usePortfolioContext } from "../../../Contexts/portfolioContext";
import { useAuthContext } from "../../../Contexts/authContext";

const Dashboard = () => {
  const [validated, setValidated] = useState(false);
  const { greeting, presentation, name, saving, jobsString, loadValues, saveValues } =
    usePortfolioContext();
  const { logout,  } = useAuthContext();
  
  const [form, setForm, updateForm] = useForm({
    greeting,
    presentation,
    name,
    jobsString,
  });

  useEffect(() => {
    if (!greeting) {
      loadValues();
    }
  }, []);


  useEffect(() => {
    updateForm({
      greeting,
      presentation,
      name,
      jobsString,
    });
  }, [greeting]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const _form = e.currentTarget;
    if (_form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      await saveValues(form);
      setValidated(false);
      loadValues();
      console.log(form)
    }
    setValidated(true);
  };

  return (
    <Container>
      <Container className="dashboard-content">
        <Row className="justify-content-md-center">
          <br />
          <br />
          <br />
          <Sidebar />

          <Col md={7} className="dashboard-col"></Col>
          <Button variant="primary" type="button" onClick={logout}>
            Logout
          </Button>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <br />
            <br />
            <Form.Group controlId="formGreeting">
              <Form.Label className="greeting_label">Greeting</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a greeting"
                name="greeting"
                value={form.greeting}
                onChange={setForm}
                required
                disabled={saving}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formPresentation">
              <Form.Label className="presentation_label">
                Presentation
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a presentation"
                name="presentation"
                value={form.presentation}
                onChange={setForm}
                required
                disabled={saving}
              />
            </Form.Group>

            <br />
            <Form.Group controlId="formName">
              <Form.Label className="name_label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name"
                name="name"
                value={form.name}
                onChange={setForm}
                required
                disabled={saving}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formJobs">
              <Form.Label className="jobs_label">Jobs</Form.Label>
              <Form.Control
                as="textarea"
                rows = {3}
                placeholder="Enter a job or function"
                name="jobsString"
                value={form.jobsString}
                onChange={setForm}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Submiting..." : "Change content"}
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
