import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import ModalAdminProjects from "./ModalAdmin-projects";
import ModalDelete from "../../../components/ModalDelete";
import { IFormProjects, useAdminProjContext } from "../../../Contexts/adminProjContext";
import { useEffect, useRef } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const AdminProjects = () => {
  const { getListProjects, projectsList } = useAdminProjContext();

  const modalRef = useRef(null);
  const deleteModal = useRef(null);

/*   interface ModalAdminProjectsRef {
    handleOpenAndFillModal: (project: IFormProjects) => void;
  } */

  useEffect(() => {
    getListProjects();
  }, [projectsList]);

  function openModal(project: IFormProjects){
    if(modalRef.current){
    //@ts-expect-error (seems like there is no function above)
      modalRef.current.handleOpenAndFillModal(project)
    }
  console.log(project);}
  

  function openDeleteModal(project:IFormProjects){
    console.log("aqui foi", project);
    if(deleteModal.current){
      //@ts-expect-error (seems like there is no function above)
      deleteModal.current.FillTitleDeleteModal(project)
    }
  }

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
            <ModalAdminProjects ref={modalRef} />
            <Table striped bordered hover variant="dark" className="projects_table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>GitHub URL</th>
          <th>DemoURL</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
          {projectsList.map((p: any) => (
          <tr key={p.id}>
          <td className="shorttextTd">{p.title}</td>
          <td className="longtextTd">{p.description}</td>
          <td className="longtextTd">{p.github}</td>
          <td className="longtextTd">{p.demo}</td>
          <td className="longtextTd">
            <Button variant="outline-success" title="Edit" className="td_projects_btn" onClick={() => {openModal(p)}}>
            <MdEdit />
            </Button>
            <Button variant="outline-danger" title="Delete" className="td_projects_btn" onClick={() => {openDeleteModal(p)}}>
            <MdDeleteForever />
            </Button>
            <ModalDelete ref={deleteModal} />
          </td>
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
