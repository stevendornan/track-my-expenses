import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, Badge, Form, Modal } from 'react-bootstrap'
import MyModal from '../layout/MyModal'
import DeleteTransactionModal from '../modals/DeleteTransactionModal'
import { numberWithCommas } from '../../utils/formatMoney'
import { formatDate } from '../../utils/formatDate'
import {
  updateTransaction,
  deleteTransaction,
} from '../../actions/transactionActions'

const TransactionItem = ({ transaction }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')

  const handleEditModalClose = () => setShowEditModal(false)
  const handleEditModalShow = () => setShowEditModal(true)
  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = () => setShowDeleteModal(true)

  const dispatch = useDispatch()

  const deleteTransactionHandler = () => {
    dispatch(deleteTransaction(transaction._id))
  }

  const editTransactionHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateTransaction({
        _id: transaction._id,
        amount: +amount,
        category,
        note,
      })
    )
    setShowEditModal(false)
  }

  useEffect(() => {
    setAmount(transaction.amount)
    setCategory(transaction.category)
    setNote(transaction.note)
  }, [])

  return (
    <>
      <Card className={transaction.amount < 0 ? 'minus' : 'plus'}>
        <Card.Body>
          <Card.Text>
            <div className='d-flex justify-content-between'>
              <div>
                <a className='edit-link' onClick={handleEditModalShow}>
                  <i className='fas fa-edit' /> Edit
                </a>
              </div>
              <div>
                <a className='delete-link' onClick={handleDeleteModalShow}>
                  Delete
                </a>
              </div>
            </div>
          </Card.Text>
          <hr />
          <Card.Text>
            <div className='d-flex justify-content-between'>
              <div>
                {formatDate(transaction.createdAt)} <br /> {transaction.note}{' '}
                <Badge variant='primary'>{transaction.category}</Badge>
              </div>
              <div
                className={`money-${transaction.amount < 0 ? 'minus' : 'plus'}`}
              >
                &pound;{numberWithCommas(transaction.amount.toFixed(2))}
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <DeleteTransactionModal
        show={showDeleteModal}
        transaction={transaction}
        handleDeleteModalClose={handleDeleteModalClose}
        deleteTransactionHandler={deleteTransactionHandler}
      />
      <MyModal show={showEditModal}>
        <Card>
          <Card.Header>
            <Card.Title>Edit transaction</Card.Title>
          </Card.Header>
          <Form onSubmit={editTransactionHandler}>
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
    </>
  )
}

export default TransactionItem
