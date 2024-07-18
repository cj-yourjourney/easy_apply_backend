// src/components/forms/Input.tsx
import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

interface InputProps {
  id: string
  name:string
  type: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false
}) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        id={id} 
        name={name} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </Form.Group>
  )
}

export default Input
