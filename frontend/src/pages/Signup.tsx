// src/pages/Signup.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { User } from '../store/users/userTypes'
import { registerUser } from '../store/users/userThunks'
import { Form } from 'react-bootstrap'
import FormContainer from '../components/Forms/FormContainer'
import Input from "../components/Forms/Input";
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'
import Button from '../components/Forms/Button'

function Signup() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.userRegister)
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant="error">Error: {error}</Message>}
      <Form onSubmit={handleSubmit}>
        <Input
          id="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <Input
          id="email"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Signup
