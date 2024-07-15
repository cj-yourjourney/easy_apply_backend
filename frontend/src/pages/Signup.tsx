import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { User } from '../store/users/userTypes'
import { registerUser } from '../store/users/userThunks'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import FormContainer from '../components/FormContainer' // Import the FormContainer component

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
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Signup
