import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api/fetchProducts';
import { Row, Col, Carousel, Image, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import '../styles/HomeScreen.css'; // Import CSS


function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="home-page-background">
      {/* <Header /> Use the updated Header component */}
      {/* <div className="home-top-section text-center py-5">
        <h1 className="display-4 font-weight-bold">Welcome to Our Store</h1>
        <p className="lead">Find the best products at unbeatable prices!</p>
      </div> */}

      {/* 🔹 Carousel */}
      {products.length > 0 && (
        <Carousel className="home-carousel mb-5" fade>
          {products.slice(0, 5).map((product) => (
            <Carousel.Item key={product._id}>
              <Image
                className="d-block w-100 home-carousel-img"
                src={product.image}
                alt={product.name}
              />
              <Carousel.Caption className="carousel-caption-overlay">
                <h3 className="carousel-title">{product.name}</h3>
                <p className="carousel-description">{product.description}</p>
                <Button
                  variant="light"
                  className="carousel-shop-now-btn"
                  onClick={() => handleViewDetails(product._id)}
                >
                  Shop Now
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* 🔹 Product Grid */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="product-grid mx-0">
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="product-container h-100 shadow-sm">
                <div className="product-image-wrapper">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <Card.Body className="product-info text-center">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">${product.price}</p>
                  <Button
                    variant="primary"
                    className="product-view-btn"
                    onClick={() => handleViewDetails(product._id)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;