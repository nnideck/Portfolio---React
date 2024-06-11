import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/about-form">About</Nav.Link>
        <Nav.Link href="/projects-form">Projects</Nav.Link>
        <Nav.Link href="/resume-form">Resume</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;