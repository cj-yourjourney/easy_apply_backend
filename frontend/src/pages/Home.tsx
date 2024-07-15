import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <Container className="mt-4">
      <Row className="text-center">
        <Col>
          <h1>Welcome to Job Application Autofill</h1>
          <p className="lead">
            Simplify your job application process with our autofill feature.
            Fill out applications faster and easier than ever before.
          </p>
          <p>
            <Button>
              Get Started
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
