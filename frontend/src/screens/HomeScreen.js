import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Landing from '../components/layout/Landing'
import Meta from '../components/layout/Meta'

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo) {
      history.push('/my-wallets')
    }
  }, [history, userInfo])
  return (
    <>
      <Meta title='Track My Expenses - Your personal expense manager on browser' />
      <Landing />
    </>
  )
}

export default HomeScreen
