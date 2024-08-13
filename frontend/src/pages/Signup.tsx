import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { User } from '../types/userTypes'
import { registerUser } from '../store/users/userThunks'
import FormContainer from '../components/Forms/FormContainer'
import Form from '../components/Forms/Form'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'

function Signup() {
  const dispatch = useAppDispatch()
  const { loading, error, user } = useAppSelector((state) => state.userRegister)
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resultAction = await dispatch(registerUser(formData))

    if (registerUser.fulfilled.match(resultAction)) {
      // Save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(resultAction.payload))
    } else {
      // Handle error (if any)
      console.error(resultAction.payload)
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant="error">Error: {error}</Message>}

      <Form
        formType="signup"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  )
}

export default Signup
