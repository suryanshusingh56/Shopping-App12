import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../reducers/userReducers';
import '../styles/Header.css';
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector(state => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" collapseOnSelect className="navbar">
      <Container>
        {/* Brand Logo */}
        <LinkContainer to='/'>
          <Navbar.Brand className="navbar-brand">
            <span className="brand-text">Shop Online</span>
          </Navbar.Brand>
        </LinkContainer>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Cart Link */}
            <LinkContainer to='/cart'>
              <Nav.Link className="nav-link">
                <i className="fa-solid fa-cart-shopping"></i>
                &nbsp; CART ({cartTotalQuantity})
              </Nav.Link>
            </LinkContainer>

            {/* User Dropdown or Sign-In Link */}
            {userDetail ? (
              <NavDropdown title={userDetail.name} id="username" className="nav-dropdown">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item className="dropdown-item">
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler} className="dropdown-item">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className="nav-link">
                  <i className="fa-solid fa-user"></i>
                  &nbsp; SIGN IN
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;