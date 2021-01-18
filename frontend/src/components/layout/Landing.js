import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='title'>Track My Expenses</h1>
          <p className='lead'>
            Is an easy-to-use app that allows you to track and categorize your
            in-and-out money.
          </p>
          <LinkContainer to='/signup'>
            <Button variant='secondary' className='py-2'>
              Get Started
            </Button>
          </LinkContainer>
        </div>
      </div>
    </section>
  )
}

export default Landing
