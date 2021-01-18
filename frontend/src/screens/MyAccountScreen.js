import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import {
  getUserDetails,
  updateUserProfile,
  deleteUserAccount,
  logout,
} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Meta from '../components/layout/Meta'
import DeleteAccountModal from '../components/modals/DeleteAccountModal'

const MyAccountScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const dispatch = useDispatch()

  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = () => setShowDeleteModal(true)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const userAccountDelete = useSelector((state) => state.userAccountDelete)
  const { success: deleteAccountSuccess } = userAccountDelete

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else if (success) {
        setTimeout(() => dispatch({ type: USER_UPDATE_PROFILE_RESET }), 2000)
      } else {
        setName(user.name)
        setPlan(user.plan.name)
        setEmail(user.email)
      }
    }
    if (deleteAccountSuccess) {
      dispatch(logout())
    }
  }, [dispatch, history, userInfo, user, success, deleteAccountSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const deleteAccountHandler = () => {
    dispatch(deleteUserAccount())
  }

  return (
    <>
      <Meta title='Track My Expenses | My Account' />
      <div className='my-4'>
        <h1 className='title'>My Account</h1>
        <hr />
        <Row>
          <Col md={3}>
            <h2>Profile Details</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='role'>
                  <Form.Label>Plan</Form.Label>
                  <Form.Control
                    type='string'
                    value={plan}
                    disabled
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength='8'
                  ></Form.Control>
                  <small>Password must be at least 8 characters</small>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' className='button-secondary btn-block'>
                  Save
                </Button>
              </Form>
            )}
          </Col>
          <Col md={3} />
          <Col md={4}>
            <h2>Settings</h2>
            <Button onClick={handleDeleteModalShow} className='my-2 btn-block'>
              Delete My Account
            </Button>
          </Col>
        </Row>
        <DeleteAccountModal
          show={showDeleteModal}
          handleDeleteModalClose={handleDeleteModalClose}
          deleteAccountHandler={deleteAccountHandler}
        />
      </div>
    </>
  )
}

export default MyAccountScreen
