import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/layout/FormContainer'
import Message from '../components/layout/Message'
import { forgotPassword } from '../actions/userActions'
import {
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,
} from '../constants/userConstants'
import Meta from '../components/layout/Meta'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const { error, success } = userForgotPassword

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch({ type: USER_FORGOT_PASSWORD_FAIL }), 2000)
    } else if (success) {
      setTimeout(() => dispatch({ type: USER_FORGOT_PASSWORD_RESET }), 2000)
    }
  }, [dispatch, error, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword({ email }))
  }

  return (
    <>
      <Meta title='Track My Expenses | Forgot Password' />
      <FormContainer>
        <h1 className='title'>Forgot your password?</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Email sent</Message>}
        <br />
        <p>Let's get you a new one.</p>
        <p>
          Please enter your email address and I'll email you a default password.
          As soon as you get the default password, log in to the app with these
          temporary credentials and head over to the My Account page and change
          your password from there.
        </p>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Control
              type='email'
              placeholder='Email address'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button className='button-secondary' type='submit'>
            Reset Password
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ForgotPasswordScreen
