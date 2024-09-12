// hooks/useForm.ts
import { useState, ChangeEvent } from 'react'

export function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return { formData, handleChange, setFormData }
}
