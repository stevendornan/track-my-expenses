import React from 'react'
import { Modal } from 'react-bootstrap'

const MyModal = ({ show, children }) => {
  return (
    <Modal show={show} centered>
      {children}
    </Modal>
  )
}

export default MyModal
