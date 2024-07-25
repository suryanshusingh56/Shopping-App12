import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
// import products from './products.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// 
function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          {/* <h1>Shopping App</h1> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/" element={<CartScreen />} />
          </Routes>

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
