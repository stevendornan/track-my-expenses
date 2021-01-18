import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='container py-3'>
        <div>
          <Link to='/about'>About Me</Link>
          <span> | </span>
          <Link to='/faq'>FAQ</Link>
        </div>
        <div>Track My Expenses &copy; 2021</div>
        <div>
          <a href='https://www.buymeacoffee.com/stevendornan' target='_blank'>
            <i className='fas fa-coffee'></i>
          </a>
          <a
            href='https://twitter.com/stevendornan93'
            target='_blank'
            className='ml-3'
          >
            <i className='fab fa-twitter'></i>
          </a>
          <a
            href='https://www.linkedin.com/in/stevendornan93'
            target='_blank'
            className='ml-3'
          >
            <i className='fab fa-linkedin'></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
