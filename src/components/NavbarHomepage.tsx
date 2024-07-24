import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./NavbarHomepage.scss";

const NavbarHomepage = () => {
  return (
    <Navbar expand="lg" className="bg-navbar" bg="success">
      <Container>
        <Navbar.Brand>
          <Link to="/" className='link'>TFG SOCIAL APP</Link>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> 
              <Link to="/" className='link'>Home</Link>
            </Nav.Link>
            <Nav.Link> 
              <Link to="/posts" className='link'>Posts</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavbarHomepage;
// Quedaría crear su archivo scss y agregarle estilos. Como es un componente de Bootstrap no hace falta responsive