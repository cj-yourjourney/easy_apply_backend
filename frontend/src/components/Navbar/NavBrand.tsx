import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBrand: React.FC = () => {
  return (
    <Navbar.Brand as={Link} to="/">
      Easy Apply
    </Navbar.Brand>
  )
}

export default NavBrand
