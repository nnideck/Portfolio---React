import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;