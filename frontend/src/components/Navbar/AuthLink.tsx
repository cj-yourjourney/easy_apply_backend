import React from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
// import { logout } from '../../store/users/userSlices'
import NavItem from './NavItem'
import Button from '../common/Button'

const AuthLink: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.userLogin)

  const handleLogout = () => {
    // dispatch(logout())
  }

  return (
    <>
      {!user ? (
        <NavItem to="/login">Login</NavItem>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </>
  )
}

export default AuthLink
