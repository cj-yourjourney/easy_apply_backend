import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { User } from '../store/users/userTypes';
import { registerUser } from "../store/users/userThunks";



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
    // console.log('form got submitted!!!!')
    //     console.log('formData:', formData)

  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Signup
