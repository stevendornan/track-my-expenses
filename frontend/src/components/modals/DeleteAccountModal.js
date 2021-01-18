import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import MyModal from '../../components/layout/MyModal'

const DeleteAccountModal = ({
  show,
  handleDeleteModalClose,
  deleteAccountHandler,
}) => {
  return (
    <MyModal show={show}>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          If you delete your account, everything will be deleted including your
          wallets and transactions, and theres no going back. Are you sure?
        </div>
        <br />
        <div className='delete-modal-buttons'>
          <Button onClick={handleDeleteModalClose}>No</Button>
          <Button onClick={() => deleteAccountHandler()}>Yes</Button>
        </div>
      </Modal.Body>
    </MyModal>
  )
}

export default DeleteAccountModal
