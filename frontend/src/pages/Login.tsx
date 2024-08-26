import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { LoginUser } from '../types/userTypes'
import { loginUser, logoutUser } from '../store/users/userThunks'
import FormContainer from '../components/Forms/FormContainer'
import Form from '../components/Forms/Form'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'
import Button from '../components/common/Button'

function Login() {
  const dispatch = useAppDispatch()
  const { loading, error, user } = useAppSelector((state) => state.userLogin)
  const [formData, setFormData] = useState<LoginUser>({
    username: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resultAction = await dispatch(loginUser(formData))

    if (loginUser.fulfilled.match(resultAction)) {
      // Save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(resultAction.payload))
    } else {
      // Handle error (if any)
      console.error(resultAction.payload)
    }
  }
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <FormContainer>
      <h1>Login</h1>
      {loading && <Loader />}
      {error && <Message variant="error">Error: {error}</Message>}

      <Form
        formType="login"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Button onClick={handleLogout}>Logout</Button>
    </FormContainer>
  )
}

export default Login