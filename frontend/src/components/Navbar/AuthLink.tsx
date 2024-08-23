import React from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/users/userThunks'
import NavItem from './NavItem'
// import Button from '../common/Button'
import Button from 'react-bootstrap/Button' // Importing Bootstrap Button component

const AuthLink: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.userLogin)

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.removeItem('userInfo')
  }

  return (
    <>
      {!user ? (
        <NavItem to="/login">Login</NavItem>
      ) : (
        <Button
          onClick={handleLogout}
          variant="link" // Use the "link" variant for a consistent look with Nav.Link
          className="nav-link mx-2" // Add Nav.Link and spacing classes
        >
          Logout
        </Button>
      )}
    </>
  )
}

export default AuthLink
