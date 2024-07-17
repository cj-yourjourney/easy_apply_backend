// src/components/Forms/Form.tsx
import React from 'react'
import { Form as BootstrapForm} from 'react-bootstrap'
import Input from './Input'
import Button from '../common/Button'

interface FormProps {
  formType: 'signup' | 'login'
  formData: {
    username?: string
    email: string
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
        <Input
          id="username"
          type="text"
          label="Username"
          value={formData.username || ''}
          onChange={onChange}
          placeholder="Enter username"
          required
        />
      )}
      <Input
        id="email"
        type="email"
        label="Email address"
        value={formData.email}
        onChange={onChange}
        placeholder="Enter email"
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <Button variant="primary" type="submit">
        {formType === 'signup' ? 'Register' : 'Login'}
      </Button>
    </BootstrapForm>
  )
}

export default Form
