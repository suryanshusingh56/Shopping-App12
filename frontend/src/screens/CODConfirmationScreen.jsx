import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

const CODConfirmationScreen = () => {
  const { id: orderId } = useParams();

  return (
    <Row>
      <Col md={8}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Placed Successfully</h2>
              <p>Your order <strong>#{orderId}</strong> has been placed successfully.</p>
              <p>Payment will be collected on delivery.</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/">Go to Home</Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CODConfirmationScreen;
