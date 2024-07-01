import { Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import ModalAdminProjects from "./ModalAdmin-projects";
import { useAdminProjContext } from "../../../Contexts/adminProjContext";
import { useEffect } from "react";

const AdminProjects = () => {
  const { getListProjects, projectsList } = useAdminProjContext();

  useEffect(() => {
    getListProjects();
  }, []);

  useEffect(() => {
console.log(projectsList);

  }, [projectsList]);

  return (
    <Container>
      <Container className="adminProj-content">
        <Row className="justify-content-md-center">
          <br />
          <br />
          <Col className="adminProj-col">
            <Sidebar />
            <br />
            <br />
            <ModalAdminProjects />
            <Table striped bordered hover variant="dark" className="projects_table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>GitHub URL</th>
          <th>DemoURL</th>
        </tr>
      </thead>
      <tbody>
         {projectsList.map((p: any) => (
          <tr key={p.id}>
          <td className="shorttextTd">{p.title}</td>
          <td className="longtextTd">{p.description}</td>
          <td className="longtextTd">{p.github}</td>
          <td className="longtextTd">{p.demo}</td>
        </tr>
        ))}
      </tbody>
    </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminProjects;
