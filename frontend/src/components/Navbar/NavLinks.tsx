import React from 'react'
import { Nav } from 'react-bootstrap'
import NavItem from './NavItem'
import AuthLink from './AuthLink'

const NavLinks: React.FC = () => {
  return (
    <Nav className="me-auto align-items-center">
      <NavItem to="/" isActive>
        Home
      </NavItem>
      <NavItem to="/signup">Sign Up</NavItem>
      <NavItem to="/pricing">Pricing</NavItem>
      <NavItem to="/about">About</NavItem>
      <AuthLink />
    </Nav>
  )
}

export default NavLinks
