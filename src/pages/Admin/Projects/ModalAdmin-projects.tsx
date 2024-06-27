import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAdminProjContext } from "../../../Contexts/adminProjContext";

const ModalAdminProjects = () => {
  const { saving, saveProject } = useAdminProjContext();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  function clearForm() {
    setTitle(""), setDescription(""), setGithub(""), setDemo("");
  }

  const handleClose = () => {
    clearForm();
    setShow(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveProject({
      title,
      description,
      github,
      demo,
    });
    handleClose();
    //loadValues();
  };

  return (
  <>
    <Button variant="primary" onClick={handleShow}>
      Create New Project
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Form noValidate onSubmit={handleSubmit}>
        <br />
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formTitle">
            <Form.Label className="title_label">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={saving}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formDescription">
            <Form.Label className="description_label">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter a description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={saving}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formGitHub">
            <Form.Label className="github_label">GitHub URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a GitHub URL"
              name="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              disabled={saving}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formDemo">
            <Form.Label className="demo_label">Demo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a demo URL"
              name="demo"
              value={demo}
              onChange={(e) => setDemo(e.target.value)}
              disabled={saving}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Submiting..." : "Save content"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>)
};

export default ModalAdminProjects;
