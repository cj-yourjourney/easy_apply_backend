import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface NavItemProps {
  to: string
  children?: React.ReactNode
  as?: React.ElementType
  onClick?: () => void
  isActive?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ to, children, isActive }) => {
  return (
    <Nav.Link as={Link} to={to} className={`mx-2 ${isActive ? 'active' : ''}`}>
      {children}
      {isActive && <span className="visually-hidden">(current)</span>}
    </Nav.Link>
  )
}

export default NavItem
