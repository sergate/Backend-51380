import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/NavBarStyles.css';
function Navbars() {
  return (
    <>
      <br />
      <Navbar className="navbarestilos">
        <Container>
          <Navbar.Brand href="#home">Brebajes Magicos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="">Vinos</Nav.Link>
            <Nav.Link href="#home">Wisky</Nav.Link>
            <Nav.Link href="#features">Tequilas & Fernet</Nav.Link>
            <Nav.Link href="#pricing">Gins</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
