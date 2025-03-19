import { Container, Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/">EcoTech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-dropdown'>
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/add-center">Add Center</Nav.Link>
          </Nav>
          {/* <Nav>
            <Nav.Link href='/admin-portal'>User</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;