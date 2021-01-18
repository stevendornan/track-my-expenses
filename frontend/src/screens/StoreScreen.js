import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ContentContainer from '../components/layout/ContentContainer'
import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table'

const StoreScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])
  return (
    <>
      <ContentContainer>
        <h1 className='title'>Store</h1>
        <hr />
        <p className='lead text-center'>
          With Track My Expenses Premium you will have full control over your
          expenses, allowing you to create unlimited wallets and transactions,
          and also any new feature that comes to the software you will be able
          to use it for free.
        </p>
        <div className='pricing'>
          <PricingTable highlightColor='#593196'>
            <PricingSlot
              buttonText='SIGN UP'
              title='PREMIUM'
              priceText='£2.00 per month'
            >
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
            <a
              className='button text-center mt-2'
              href='https://www.buymeacoffee.com/stevendornan'
              target='_blank'
            >
              Subscribe
            </a>
          </PricingTable>
        </div>
      </ContentContainer>
    </>
  )
}

export default StoreScreen
