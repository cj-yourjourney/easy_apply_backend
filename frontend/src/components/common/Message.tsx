import React from 'react'
import { Alert } from 'react-bootstrap'

interface MessageProps {
  variant: 'error' | 'success' | 'info'
  children: React.ReactNode
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
  
  const alertVariant = variant === 'error' ? 'danger' : variant

  return <Alert variant={alertVariant}>{children}</Alert>
}

export default Message
