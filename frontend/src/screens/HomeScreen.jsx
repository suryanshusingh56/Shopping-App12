import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/fetchProducts';
import { Row, Col, Carousel, Image } from 'react-bootstrap';
import ProductScreen from './ProductScreen';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import '../styles/HomeScreen.css'; 

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {/* Carousel at the top displaying all product images */}
      {products.length > 0 && (
        <Carousel className="home-carousel mb-4">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Image className="d-block w-100 home-carousel-img" src={product.image} alt={product.name} fluid />
              <Carousel.Caption>
                <h5>{product.name}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Product List */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3} className="mb-4">
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
