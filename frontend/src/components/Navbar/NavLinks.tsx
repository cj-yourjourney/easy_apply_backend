import React from 'react'
import { Nav } from 'react-bootstrap'
import NavItem from './NavItem'

const NavLinks: React.FC = () => {
  return (
    <Nav className="me-auto">
      <NavItem to="/" isActive>
        Home
      </NavItem>
      <NavItem to="/signup">Sign Up</NavItem>
      <NavItem to="/pricing">Pricing</NavItem>
      <NavItem to="/about">About</NavItem>
    </Nav>
  )
}

export default NavLinks
