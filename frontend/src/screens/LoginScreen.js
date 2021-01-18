import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import FormContainer from '../components/layout/FormContainer'
import { login } from '../actions/userActions'
import Meta from '../components/layout/Meta'
import { USER_LOGIN_FAIL } from '../constants/userConstants'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/my-wallets')
    }
    if (error) {
      setTimeout(() => dispatch({ type: USER_LOGIN_FAIL }), 2000)
    }
  }, [history, dispatch, userInfo, error])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <Meta title='Track My Expenses | Login' />
      <br />
      <FormContainer>
        <h1 className='title'>Login</h1>
        {error && (
          <Message className='alert-danger'>
            {' '}
            <i className='fa fa-exclamation-triangle' /> {error}
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <InputGroup className='mb-2 mr-sm-2'>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className='fas fa-lock'></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>

          <Button type='submit' className='button-secondary default-button'>
            Log In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            <p>
              <small>
                Don't have an account?{' '}
                <Link className='link' to='/signup'>
                  Register here
                </Link>
              </small>
              <br />
              <small>
                Forgot your password?{' '}
                <Link className='link' to='/forgot-password'>
                  Reset here
                </Link>
              </small>
            </p>
          </Col>
        </Row>
      </FormContainer>
      <br />
    </>
  )
}

export default Login
