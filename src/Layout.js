import React from "react"
import { Button, Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'

class Layout extends React.Component {

//   componentDidMount() {
//   }

  render() {
    return (
      <html>
        <Navbar  variant="dark" style={{ backgroundColor:"#18447b",height:"4.5rem"}}expand="lg">
          <Container>
            <Navbar.Brand href="/">CTA Delay Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/BusRoutesPage">Bus Routes</Nav.Link>

                {/* <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </html>
    )
  }
}

export default Layout;


