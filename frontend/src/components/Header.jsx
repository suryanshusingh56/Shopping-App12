import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserDetail } from '../api/fetchUser';
import { logout } from '../reducers/userReducers';
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  
  const { userDetail } = userLogin;
  
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout());
  }
  const { cartTotalQuantity } = useSelector(state => state.cart);
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >Shop Online</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: 'auto' }}>
              <LinkContainer to='/cart'>
                <Nav.Link >
                  <i className="fa-solid fa-cart-shopping"></i>
                  &nbsp; CART {cartTotalQuantity}
                </Nav.Link>
              </LinkContainer>
              {userDetail ? (
                <NavDropdown title={userDetail.name} id="username">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>

                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link >
                    <i className="fa-solid fa-user"></i>
                    &nbsp; SIGNIN
                  </Nav.Link>
                </LinkContainer>
              )}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
