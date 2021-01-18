import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/layout/FormContainer'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { register } from '../actions/userActions'
import Meta from '../components/layout/Meta'
import { USER_REGISTER_FAIL } from '../constants/userConstants'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  let { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/my-wallets')
    }
    if (message) {
      setTimeout(() => setMessage(''), 2000)
    } else if (error) {
      setTimeout(() => dispatch({ type: USER_REGISTER_FAIL }), 2000)
    }
  }, [dispatch, history, userInfo, message, error])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>
      <Meta title='Track My Expenses | Sign Up' />
      <br />
      <FormContainer>
        <h1 className='title'>Sign Up</h1>
        {message && (
          <Message className='alert-danger'>
            {' '}
            <i className='fa fa-exclamation-triangle' /> {message}
          </Message>
        )}
        {error && (
          <Message className='alert-danger'>
            <i className='fa fa-exclamation-triangle' /> {error}
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup className='mb-2 mr-sm-2'>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                minLength='8'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className='fas fa-lock'></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
            <small>Password must be at least 8 characters</small>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button className='button-secondary' type='submit'>
            Sign Up
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            <p>
              <small>
                Already have an account?{' '}
                <Link className='link' to='/login'>
                  Log in here
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

export default RegisterScreen
