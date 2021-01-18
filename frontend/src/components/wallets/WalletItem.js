import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Form, Button, Modal } from 'react-bootstrap'
import { formatDate } from '../../utils/formatDate'
import DeleteWalletModal from '../modals/DeleteWalletModal'
import MyModal from '../layout/MyModal'
import { updateWallet, deleteWallet } from '../../actions/walletActions'
import { createTransaction } from '../../actions/transactionActions'

const WalletItem = ({ wallet, history }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAdjustBalanceModal, setShowAdjustBalanceModal] = useState(false)
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)

  const [name, setName] = useState('')
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const dispatch = useDispatch()

  const toggleCard = () => setIsOpened((wasOpened) => !wasOpened)
  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = () => setShowDeleteModal(true)
  const handleEditModalClose = () => setShowEditModal(false)
  const handleEditModalShow = () => setShowEditModal(true)
  const handleAdjustBalanceModalClose = () => setShowAdjustBalanceModal(false)
  const handleAdjustBalanceModalShow = () => setShowAdjustBalanceModal(true)
  const handleAddTransactionModalClose = () => setShowAddTransactionModal(false)
  const handleAddTransactionModalShow = () => setShowAddTransactionModal(true)

  const editWalletHandler = (e) => {
    e.preventDefault()

    dispatch(updateWallet({ _id: wallet._id, name, balance: +balance }))
    setShowEditModal(false)
  }

  const adjustBalanceHandler = (e) => {
    e.preventDefault()
    dispatch(updateWallet({ _id: wallet._id, name, balance: +balance }))
    setShowAdjustBalanceModal(false)
  }

  const deleteWalletHandler = (id) => {
    dispatch(deleteWallet(id))
  }

  const addTransactionHandler = (e) => {
    e.preventDefault()
    const newTransaction = {
      amount: +amount,
      category,
      note,
    }
    dispatch(createTransaction(wallet._id, newTransaction))
    setShowAddTransactionModal(false)
  }

  useEffect(() => {
    setName(wallet.name)
    setBalance(wallet.balance)
  }, [])

  return (
    <>
      <Card className='wallet-card'>
        <Card.Body onClick={toggleCard}>
          <Card.Text>
            <div className='d-flex justify-content-between'>
              <div>
                <strong>{wallet.name} </strong>
                <span>&pound;{wallet.balance.toFixed(2)}</span>
              </div>
              <div>
                <a onClick={handleAddTransactionModalShow}>Add Transaction</a>
              </div>
              {wallet.transactions.length > 0 && (
                <>
                  <div>
                    <Link to={`/wallets/${wallet._id}/transactions`}>
                      View Transactions
                    </Link>
                  </div>
                </>
              )}
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Created on: {formatDate(wallet.createdAt)}</small>
        </Card.Footer>
      </Card>
      <br />
      {isOpened && (
        <>
          <Card>
            <Card.Header>
              <h4>Wallet details</h4>
              <a className='edit-link' onClick={handleEditModalShow}>
                <i className='fas fa-edit' /> Edit
              </a>
              <a className='delete-link' onClick={handleDeleteModalShow}>
                Delete
              </a>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>{wallet.name}</strong>{' '}
                <span>&pound;{wallet.balance.toFixed(2)}</span>
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Owner</strong> <span>{wallet.user.email}</span>
              </Card.Text>
              <hr />
              <Card.Text>
                <strong>Transactions</strong> {wallet.transactions.length}
              </Card.Text>
              <hr />
              <Card.Text className='text-center'>
                <a onClick={handleAdjustBalanceModalShow}>ADJUST BALANCE</a>
              </Card.Text>
              {wallet.transactions.length > 0 && (
                <>
                  <hr />
                  <Card.Text className='text-center'>
                    <Link to={`/wallets/${wallet._id}/transactions`}>
                      VIEW TRANSACTIONS
                    </Link>
                  </Card.Text>
                </>
              )}
            </Card.Body>
            <Card.Footer>
              <small>Created on: {formatDate(wallet.createdAt)}</small>
            </Card.Footer>
          </Card>
        </>
      )}

      <DeleteWalletModal
        show={showDeleteModal}
        wallet={wallet}
        handleDeleteModalClose={handleDeleteModalClose}
        deleteWalletHandler={deleteWalletHandler}
      />

      <MyModal show={showEditModal}>
        <Card>
          <Card.Header>
            <Card.Title>Edit wallet</Card.Title>
          </Card.Header>
          <Form onSubmit={editWalletHandler}>
            <Card.Body>
              <Modal.Body>
                <Form.Group controlId='name'>
                  <Form.Label>Wallet name</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your wallet name?'
                  />
                </Form.Group>
                <Form.Group controlId='balance'>
                  <Form.Label>Initial Balance</Form.Label>
                  <Form.Control
                    type='number'
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleEditModalClose}>Cancel</Button>
                <Button type='submit'>Save</Button>
              </Modal.Footer>
            </Card.Body>
          </Form>
        </Card>
      </MyModal>
      <MyModal show={showAdjustBalanceModal}>
        <Card>
          <Card.Header>
            <Card.Title>Adjust Balance</Card.Title>
          </Card.Header>
          <Form onSubmit={adjustBalanceHandler}>
            <Card.Body>
              <Modal.Body>
                <Form.Group controlId='balance'>
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type='number'
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleAdjustBalanceModalClose}>Cancel</Button>
                <Button type='submit'>Save</Button>
              </Modal.Footer>
            </Card.Body>
          </Form>
        </Card>
      </MyModal>
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
                        <option value='Food & Beverage'>Food & Beverage</option>
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
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleAddTransactionModalClose}>Cancel</Button>
                <Button type='submit'>Save</Button>
              </Modal.Footer>
            </Card.Body>
          </Form>
        </Card>
      </MyModal>
    </>
  )
}

export default WalletItem
