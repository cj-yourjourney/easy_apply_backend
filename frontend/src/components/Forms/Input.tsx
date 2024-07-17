// src/components/forms/Input.tsx
import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

interface InputProps {
  id: string
  type: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
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
        id={id} // Use 'id' as the 'id' attribute for Form.Control
        name={id} // Use 'id' as the 'name' attribute for Form.Control
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </Form.Group>
  )
}

export default Input
