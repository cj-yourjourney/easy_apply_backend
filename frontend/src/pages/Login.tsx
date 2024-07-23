// src/pages/Login.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { LoginUser } from '../types/userTypes'
import { loginUser } from '../store/users/userThunks'
import FormContainer from '../components/Forms/FormContainer'
import Form from '../components/Forms/Form'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'


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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(formData))
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

    </FormContainer>
  )
}

export default Login
