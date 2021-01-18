import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Meta from '../components/layout/Meta'

const AboutMeScreen = () => {
  return (
    <>
      <Meta title='Track My Expenses | About Me' />
      <div className='my-4'>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <img
              src='/images/me.png'
              alt='me'
              style={{
                width: '120px',
                display: 'block',
                margin: '0 auto',
              }}
              className='rounded-circle'
            />
            <div className-='about-info'>
              <p>Hi,</p>
              <p>
                I'm Steven Dornan a Freelance Software Engineer from Craigavon,
                Northern Ireland.
              </p>
              <p>
                I'm passionate about creating new products and releasing them to
                the world.
              </p>
              <p>
                If you want to support me, or support the development of Track
                My Expenses, you can become a premium member for only
                &pound;2.00 a month or buy me a coffee from my BMC page.
              </p>
              <a
                href='https://www.buymeacoffee.com/stevendornan'
                target='_blank'
              >
                <img
                  src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
                  alt='Buy Me A Coffee'
                  style={{ height: '60px', width: '217px' }}
                />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AboutMeScreen
