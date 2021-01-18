import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import { Modal, Button, Form } from 'react-bootstrap'
import ContentContainer from '../components/layout/ContentContainer'
import MyModal from '../components/layout/MyModal'
import WalletItem from '../components/wallets/WalletItem'
import Meta from '../components/layout/Meta'
import { createWallet, listMyWallets } from '../actions/walletActions'
import {
  WALLET_CREATE_RESET,
  WALLET_UPDATE_RESET,
  WALLET_DELETE_RESET,
} from '../constants/walletConstants'
import { TRANSACTION_CREATE_RESET } from '../constants/transactionConstants'

const MyWalletsScreen = ({ history }) => {
  const [showAddWalletModal, setShowAddWalletModal] = useState(false)
  const [name, setName] = useState('')
  const [balance, setBalance] = useState(0)

  const dispatch = useDispatch()

  const handleAddWalletModalClose = () => setShowAddWalletModal(false)
  const handleAddWalletModalShow = () => setShowAddWalletModal(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const walletListMy = useSelector((state) => state.walletListMy)
  const { loading, error, wallets } = walletListMy

  const transactionCreate = useSelector((state) => state.transactionCreate)
  const {
    success: successTransCreate,
    loading: loadingTransCreate,
    error: errorTransCreate,
  } = transactionCreate

  const walletCreate = useSelector((state) => state.walletCreate)
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = walletCreate

  const walletUpdate = useSelector((state) => state.walletUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = walletUpdate

  const walletDelete = useSelector((state) => state.walletDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = walletDelete

  const createWalletHandler = (e) => {
    e.preventDefault()
    const newWallet = {
      name,
      balance: +balance,
    }
    dispatch(createWallet(newWallet))
    setName('')
    setBalance(0)
    setShowAddWalletModal(false)
  }

  useEffect(() => {
    dispatch(listMyWallets())

    if (!userInfo) {
      history.push('/login')
    } else {
      if (successCreate) {
        dispatch({ type: WALLET_CREATE_RESET })
      } else if (successUpdate) {
        dispatch({ type: WALLET_UPDATE_RESET })
      } else if (successDelete) {
        dispatch({ type: WALLET_DELETE_RESET })
      } else if (successTransCreate) {
        dispatch({ type: TRANSACTION_CREATE_RESET })
      } else if (errorCreate) {
        setTimeout(() => dispatch({ type: WALLET_CREATE_RESET }), 3000)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
    successTransCreate,
    errorCreate,
  ])
  return (
    <>
      <Meta title='Track My Expenses | My Wallets' />
      <div className='my-2'>
        {loadingTransCreate && <Loader />}
        {errorTransCreate && (
          <Message variant='danger'>{errorTransCreate}</Message>
        )}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <ContentContainer>
            <div className='d-flex justify-content-center pb-3'>
              <Button variant='primary' onClick={handleAddWalletModalShow}>
                Add Wallet
              </Button>
            </div>
            {wallets.length === 0 && (
              <>
                <div className='text-center'>
                  <h2>You currently have no wallets</h2>
                </div>
              </>
            )}

            {(wallets ?? []).map((wallet) => (
              <WalletItem key={wallet._id} wallet={wallet} />
            ))}
          </ContentContainer>
        </>
      )}
      {showAddWalletModal && (
        <>
          <MyModal show={showAddWalletModal}>
            <Modal.Header>
              <Modal.Title>Add a wallet</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createWalletHandler}>
              <Modal.Body>
                <Form.Group controlId='name'>
                  <Form.Label>Wallet name</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your wallet name?'
                    required
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
                <Button
                  variant='primary'
                  type='submit'
                  onClick={handleAddWalletModalClose}
                >
                  Cancel
                </Button>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </MyModal>
        </>
      )}
    </>
  )
}

export default MyWalletsScreen
