import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <>
      <footer>
        <Container>
        <Row>
            <Col className='text-center'>
                <span >Copyright &#xA9; : Surya App</span>
           
            </Col>
        </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer

