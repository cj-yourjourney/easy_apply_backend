// src/pages/Login.tsx
import React, { FormEvent } from 'react'
import { LoginUser } from '../types/userTypes'
import { loginUser } from '../store/users/userThunks'
import FormContainer from '../components/Forms/FormContainer'
import Form from '../components/Forms/Form'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/hooks/useForm'
import { useAuth } from '../utils/hooks/useAuth'
import { useAppSelector } from '../store/hooks'


const Login: React.FC = () => {
  const { loading, error } = useAppSelector((state) => state.userLogin)
  const profile = useAppSelector((state) => state.profileCreate.profile)
  const { formData, handleChange } = useForm<LoginUser>({
    username: '',
    password: ''
  })
  const { handleAuthSubmit } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAuthSubmit(
      formData,
      loginUser,
      (payload) => {
        localStorage.setItem('userInfo', JSON.stringify(payload))

         if (!profile) {
           navigate('/profile-info/')
         } else {
           navigate(-1) 
         }
      },
      (error) => console.error(error)
    )
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
