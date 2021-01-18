import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import MyModal from '../components/layout/MyModal'
import ContentContainer from '../components/layout/ContentContainer'
import { listMyTransactions } from '../actions/transactionActions'
import TransactionItem from '../components/transactions/TransactionItem'
import Balance from '../components/wallets/Balance'
import Meta from '../components/layout/Meta'
import { numberWithCommas } from '../utils/formatMoney'
import { createTransaction } from '../actions/transactionActions'
import { listWalletDetails } from '../actions/walletActions'
import {
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_DELETE_RESET,
} from '../constants/transactionConstants'

const MyTransactionsScreen = ({ history, match }) => {
  const walletId = match.params.walletId
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)

  const handleAddTransactionModalClose = () => setShowAddTransactionModal(false)
  const handleAddTransactionModalShow = () => setShowAddTransactionModal(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const transactionListMy = useSelector((state) => state.transactionListMy)
  const { loading, error, transactions } = transactionListMy

  const walletMyDetails = useSelector((state) => state.walletMyDetails)
  const { wallet } = walletMyDetails

  const transactionCreate = useSelector((state) => state.transactionCreate)
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = transactionCreate

  const transactionUpdate = useSelector((state) => state.transactionUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = transactionUpdate

  const transactionDelete = useSelector((state) => state.transactionDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = transactionDelete

  useEffect(() => {
    dispatch(listMyTransactions(walletId))
    dispatch(listWalletDetails(walletId))
    if (!userInfo) {
      history.push('/login')
    } else {
      if (successUpdate) {
        dispatch({ type: TRANSACTION_UPDATE_RESET })
      } else if (successCreate) {
        dispatch({ type: TRANSACTION_CREATE_RESET })
      } else if (successDelete) {
        dispatch({ type: TRANSACTION_DELETE_RESET })
      } else if (errorCreate) {
        setTimeout(() => dispatch({ type: TRANSACTION_CREATE_RESET }), 3000)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    walletId,
    successUpdate,
    successCreate,
    successDelete,
    errorCreate,
  ])

  const amounts = (transactions ?? []).map((transaction) => transaction.amount)

  const inflow = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const outflow =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2)

  const addTransactionHandler = (e) => {
    e.preventDefault()
    const newTransaction = {
      amount: +amount,
      category,
      note,
    }
    dispatch(createTransaction(walletId, newTransaction))
    setAmount(0)
    setCategory('')
    setNote('')
    setShowAddTransactionModal(false)
  }

  return (
    <>
      <Meta title='Track My Expenses | My Transactions' />
      <div className='my-4'>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col md={3}>
                <LinkContainer to='/my-wallets'>
                  <Button variant='secondary'>Go Back</Button>
                </LinkContainer>
              </Col>
            </Row>
            <ContentContainer>
              <div className='d-flex justify-content-center pb-3'>
                <Button
                  variant='primary'
                  onClick={handleAddTransactionModalShow}
                >
                  Add Transaction
                </Button>
              </div>
              {error ? (
                <>
                  <h2 className='text-center'>{error}</h2>
                </>
              ) : (
                <>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <div className='d-flex justify-content-between'>
                          <div>
                            <strong>{wallet.name} </strong>
                            <span>
                              <Balance balance={wallet.balance} />
                            </span>
                          </div>
                          <div></div>
                        </div>
                      </Card.Text>
                      <Card.Text>
                        <div className='d-flex justify-content-between'>
                          <div>
                            <strong>Inflow</strong>
                          </div>
                          <div>
                            <span className='money-plus'>
                              <span>+</span>&pound;
                              {numberWithCommas(inflow)}
                            </span>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                          <div>
                            <strong>Outflow</strong>
                          </div>
                          <div>
                            <span className='money-minus'>
                              <span>-</span>&pound;
                              {outflow.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {(transactions ?? []).map((transaction) => (
                    <TransactionItem
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
                  <Card>
                    <Card.Footer>
                      <Card.Text>
                        Initial Balance: &pound;
                        {wallet.balance && wallet.balance.toFixed(2)}
                      </Card.Text>
                    </Card.Footer>
                  </Card>
                </>
              )}
            </ContentContainer>
          </>
        )}
        <MyModal show={showAddTransactionModal}>
          <Card>
            <Card.Header>
              <Card.Title>Add transaction</Card.Title>
            </Card.Header>
            <Form onSubmit={addTransactionHandler}>
              <Card.Body>
                <Modal.Body>
                  <Form.Group controlId='amount'>
                    <Form.Label>
                      Amount (positive = income, negative = expense)
                    </Form.Label>
                    <Form.Control
                      type='number'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                  {amount >= 0 ? (
                    <>
                      <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          as='select'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value=''>Select category</option>
                          <option value='Award'>Award</option>
                          <option value='Gifts'>Gifts</option>
                          <option value='Interest Money'>Interest Money</option>
                          <option value='Others'>Others</option>
                          <option value='Salary'>Salary</option>
                          <option value='Selling'>Selling</option>
                        </Form.Control>
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          as='select'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value=''>Select category</option>
                          <option value='Bills & Utilities'>
                            Bills & Utilities
                          </option>
                          <option value='Business'>Business</option>
                          <option value='Education'>Education</option>
                          <option value='Entertainment'>Entertainment</option>
                          <option value='Family'>Family</option>
                          <option value='Fees & Charges'>Fees & Charges</option>
                          <option value='Food & Beverage'>
                            Food & Beverage
                          </option>
                          <option value='Gifts & Donations'>
                            Gifts & Donations
                          </option>
                          <option value='Health & Fitness'>
                            Health & Fitness
                          </option>
                          <option value='Insurances'>Insurances</option>
                          <option value='Others'>Others</option>
                          <option value='Shopping'>Shopping</option>
                          <option value='Transportation'>Transportation</option>
                        </Form.Control>
                      </Form.Group>
                    </>
                  )}
                  <Form.Group controlId='note'>
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      type='text'
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder='Note'
                      required
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleAddTransactionModalClose}>
                    Cancel
                  </Button>
                  <Button type='submit'>Save</Button>
                </Modal.Footer>
              </Card.Body>
            </Form>
          </Card>
        </MyModal>
      </div>
    </>
  )
}

export default MyTransactionsScreen
