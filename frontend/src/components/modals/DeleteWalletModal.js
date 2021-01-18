import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import MyModal from '../../components/layout/MyModal'

const DeleteWalletModal = ({
  show,
  wallet,
  handleDeleteModalClose,
  deleteWalletHandler,
}) => {
  return (
    <MyModal show={show}>
      <Modal.Header>
        <Modal.Title>Do you want to delete wallet {wallet.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          You will also delete all of its transactions and this action cannot be
          undone.
        </div>
        <br />
        <div className='delete-modal-buttons'>
          <Button onClick={handleDeleteModalClose}>Cancel</Button>
          <Button onClick={() => deleteWalletHandler(wallet._id)}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </MyModal>
  )
}

export default DeleteWalletModal
