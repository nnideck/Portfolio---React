import { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { useAuthContext } from "../Contexts/authContext";


const Sidebar = () => {
  const { logout  } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="admin-menu-btn" variant="primary" onClick={handleShow}>
        Menu
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sidebar">
            <Nav defaultActiveKey="/dashboard" className="flex-column">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/about-form">About</Nav.Link>
              <Nav.Link href="/admin-projects">Projects</Nav.Link>
              <Nav.Link href="/resume-form">Resume</Nav.Link>
            </Nav>
            <Button variant="primary" type="button" onClick={logout}>
            Logout
          </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
