// src/components/Forms/Form.tsx
import React from 'react'
import { Form as BootstrapForm } from 'react-bootstrap'
import Input from './Input'
import CustomButton from '../common/Button'

interface FormProps {
  formType: 'signup' | 'login'
  formData: {
    username?: string
    email?: string 
    password: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form: React.FC<FormProps> = ({
  formType,
  formData,
  onChange,
  onSubmit
}) => {
  return (
    <BootstrapForm onSubmit={onSubmit}>
      {formType === 'signup' && (
        <>
          <Input
            id="username"
            name='username'
            type="text"
            label="Username"
            value={formData.username || ''}
            onChange={onChange}
            placeholder="Enter username"
            required
          />
          <Input
            id="email"
            name='email'
            type="email"
            label="Email address"
            value={formData.email || ''}
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </>
      )}
      {formType === 'login' && (
        <Input
          id="username"
          name='username'
          type="text"
          label="Email"
          value={formData.username || ''}
          onChange={onChange}
          placeholder="Email"
          required
        />
      )}
      <Input
        id="password"
        name='password'
        type="password"
        label="Password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <CustomButton variant="primary" type="submit">
        {formType === 'signup' ? 'Register' : 'Login'}
      </CustomButton>
    </BootstrapForm>
  )
}

export default Form
