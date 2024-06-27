import {  Col, Container, Row, } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import ModalAdminProjects from "./ModalAdmin-projects";


const AdminProjects = () => {
  return (
    <Container>
      <Container className="adminProj-content">
        <Row className="justify-content-md-center">
          <br />
          <br />
          <Col md={5} className="adminProj-col">
            <Sidebar />
            <br />
            <br />
            <ModalAdminProjects />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminProjects;
