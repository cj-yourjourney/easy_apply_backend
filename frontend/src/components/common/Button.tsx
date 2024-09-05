import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

interface CustomButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' // Add type prop here
  children: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
  children
}) => {
  return (
    <BootstrapButton
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="mt-4 w-100"
    >
      {children}
    </BootstrapButton>
  )
}

export default CustomButton
