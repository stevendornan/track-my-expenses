import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import MyModal from '../../components/layout/MyModal'

const DeleteTransactionModal = ({
  show,
  transaction,
  handleDeleteModalClose,
  deleteTransactionHandler,
}) => {
  return (
    <MyModal show={show}>
      <Modal.Header>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Delete this transaction?</div>
        <br />
        <div className='delete-modal-buttons'>
          <Button onClick={handleDeleteModalClose}>No</Button>
          <Button onClick={() => deleteTransactionHandler(transaction._id)}>
            Yes
          </Button>
        </div>
      </Modal.Body>
    </MyModal>
  )
}

export default DeleteTransactionModal
