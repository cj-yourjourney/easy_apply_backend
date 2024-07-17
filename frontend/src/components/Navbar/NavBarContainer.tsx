// src/components/Navbar/NavBarContainer.tsx
import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import NavBrand from './NavBrand'
import NavLinks from './NavLinks'

const NavBarContainer: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" data-bs-theme="dark">
      <Container fluid>
        <NavBrand />
        <Navbar.Toggle aria-controls="navbarColor01" />
        <Navbar.Collapse id="navbarColor01">
          <NavLinks />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarContainer
