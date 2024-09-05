// src/components/common/StatusDisplay.tsx
import React from 'react'
import Loader from './Loader'
import Message from './Message'

interface StatusDisplayProps {
  loading: boolean
  error?: string | null
  successMessage?: string
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  loading,
  error,
  successMessage
}) => (
  <>
    {loading && <Loader />}
    {error && <Message variant="error">{error}</Message>}
    {successMessage && <Message variant="success">{successMessage}</Message>}
  </>
)

export default StatusDisplay
