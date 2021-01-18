import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import ContentContainer from '../components/layout/ContentContainer'
import Meta from '../components/layout/Meta'

const FaqScreen = () => {
  return (
    <>
      <Meta title='Track My Expenses | FAQ' />
      <ContentContainer>
        <h1 className='title text-center'>Frequently Asked Questions</h1>
        <Accordion defaultActiveKey='0' className='mt-5 ml-3'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <b>How do I become a premium member?</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                You have two ways to become a premium member of Track My
                Expenses. <br />
                <br /> 1. As a logged in user click on the drop down list beside
                your name at the top and click on store, and then click on the
                subscribe button. This will bring you to my BMC page and you can
                join my membership from there. <br />
                <br />
                2. Click on this{' '}
                <a
                  href='https://www.buymeacoffee.com/stevendornan'
                  target='_blank'
                >
                  <b>link</b>
                </a>{' '}
                directly and you'll also be sent to my BMC page where you can
                join my membership.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey='0' className='ml-3'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <b>Is it safe to make payments via your BMC page?</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                Yes it is. My BMC page uses secure payment methods such as
                PayPal.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey='0' className='ml-3'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <b>Can I cancel my premium subscription anytime?</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                Sure Subscriptions can be canceled at any time on your PayPal
                settings page or contact me via Twitter{' '}
                <a href='https://twitter.com/stevendornan93' targe='_blank'>
                  @stevendornan93
                </a>{' '}
                or email at{' '}
                <a href='mailto:steven.dornan93@gmail.com'>
                  {' '}
                  steven.dornan93@gmail.com.
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <p className='text-center mt-5'>
          If you have any additional questions, please contact me via twitter{' '}
          <a href='https://twitter.com/stevendornan93' targe='_blank'>
            @stevendornan93
          </a>{' '}
          or email at{' '}
          <a href='mailto:steven.dornan93@gmail.com'>
            {' '}
            steven.dornan93@gmail.com.
          </a>{' '}
          <br /> I'll be glad to help.
        </p>
      </ContentContainer>
    </>
  )
}

export default FaqScreen
