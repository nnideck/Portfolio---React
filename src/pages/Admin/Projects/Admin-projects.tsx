import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import { useState } from "react";
import { useAdminProjContext } from "../../../Contexts/adminProjContext";

const AdminProjects = () => {
  const [validated, setValidated] = useState(false);
  const {
    title,
    description,
    github,
    demo,
    saving,
    loadValues,
  } = useAdminProjContext();

  loadValues()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const _form = e.currentTarget;
    if (_form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      //await saveValues(form);
      setValidated(false);
      loadValues();
    }
    setValidated(true);
  };

  return (
    <Container>
      <Container className="adminProj-content">
        <Row className="justify-content-md-center">
          <br />
          <br />
          <Col md={5} className="adminProj-col">
            <Sidebar />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <br />
              <Form.Group controlId="formTitle">
                <Form.Label className="title_label adm-label">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a title"
                  name="title"
                  value={title}
                  //onChange={setForm}
                  required
                  disabled={saving}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formDescription">
                <Form.Label className="description_label adm-label">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a description"
                  name="description"
                  value={description}
                  //onChange={setForm}
                  required
                  disabled={saving}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formGitHub">
                <Form.Label className="github_label adm-label">
                 GitHub URL
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a GitHub URL"
                  name="github"
                  value={github}
                  //onChange={setForm}
                  disabled={saving}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formDemo">
                <Form.Label className="demo_label adm-label">
                 Demo URL
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a demo URL"
                  name="demo"
                  value={demo}
                  //onChange={setForm}
                  disabled={saving}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Submiting..." : "Change content"}
              </Button>
              <br />
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminProjects;
