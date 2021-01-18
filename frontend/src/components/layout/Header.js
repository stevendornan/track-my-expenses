import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {userInfo || !userInfo ? (
            <>
              <LinkContainer to='/'>
                <Navbar.Brand>
                  <i className='fas fa-coins icon' /> Track My Expenses
                </Navbar.Brand>
              </LinkContainer>
            </>
          ) : userInfo && userInfo.role === 'admin' ? (
            <>
              <Navbar.Brand>Admin</Navbar.Brand>
            </>
          ) : (
            <LinkContainer to='/'>
              <Navbar.Brand>
                <i className='fas fa-coins icon' /> Track My Expenses
              </Navbar.Brand>
            </LinkContainer>
          )}

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo && userInfo.role !== 'admin' ? (
                <>
                  <LinkContainer to='/my-wallets' style={{ margin: 'auto' }}>
                    <Nav.Link>My Wallets </Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={userInfo && userInfo.name}
                    id='username'
                    style={{ margin: 'auto' }}
                  >
                    <LinkContainer to='/my-account'>
                      <NavDropdown.Item>My Account</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/my-wallets'>
                      <NavDropdown.Item>My Wallets</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/store'>
                      <NavDropdown.Item>Store</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : userInfo && userInfo.role === 'admin' ? (
                <>
                  <LinkContainer to='/admin/users'>
                    <Nav.Link>Users</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/admin/plans'>
                    <Nav.Link>Plans</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={userInfo && userInfo.name}
                    id='username'
                    style={{ margin: 'auto' }}
                  >
                    <LinkContainer to='/my-account'>
                      <NavDropdown.Item>My Account</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/pricing'>
                    <Nav.Link>Pricing</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
