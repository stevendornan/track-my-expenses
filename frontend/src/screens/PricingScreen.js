import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ContentContainer from '../components/layout/ContentContainer'
import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table'

const PricingScreen = () => {
  return (
    <>
      <ContentContainer>
        <h1 className='text-center title'>Pricing</h1>
        <p className='lead text-center'>
          Get started for{' '}
          <Link to='/signup'>
            <b>FREE</b>
          </Link>{' '}
          or get FULL ACCESS with the Premium Plan.
        </p>
        <PricingTable highlightColor='#593196'>
          <PricingSlot title='FREE' priceText='£0 per month'>
            <PricingDetail>
              {' '}
              <b>1</b> wallet
            </PricingDetail>
            <PricingDetail>
              {' '}
              <b>2 </b> transactions
            </PricingDetail>
            <PricingDetail>
              {' '}
              <b>Support</b> included
            </PricingDetail>
            <PricingDetail></PricingDetail>
            <PricingDetail></PricingDetail>
            <PricingDetail></PricingDetail>
          </PricingSlot>
          <PricingSlot highlighted title='PREMIUM' priceText='£2 per month'>
            <PricingDetail>
              {' '}
              <b>Unlimited</b> wallets
            </PricingDetail>
            <PricingDetail>
              {' '}
              <b>Unlimited</b> transactions
            </PricingDetail>
            <PricingDetail>
              {' '}
              <b>New features</b> included
            </PricingDetail>
            <PricingDetail>
              {' '}
              <b>24/7 support</b> included
            </PricingDetail>
          </PricingSlot>
        </PricingTable>
        <Row>
          <Col md={6}></Col>
          <Col md={6}></Col>
        </Row>
      </ContentContainer>
    </>
  )
}

export default PricingScreen
