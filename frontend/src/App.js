import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import MyAccountScreen from './screens/MyAccountScreen'
import MyWalletsScreen from './screens/MyWalletsScreen'
import MyTransactionsScreen from './screens/MyTransactionsScreen'
import UsersScreen from './screens/UsersScreen'
import AboutMeScreen from './screens/AboutMeScreen'
import StoreScreen from './screens/StoreScreen'
import PricingScreen from './screens/PricingScreen'
import FaqScreen from './screens/FaqScreen'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Container>
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/signup' component={RegisterScreen} exact />
            <Route path='/pricing' component={PricingScreen} exact />
            <Route
              path='/forgot-password'
              component={ForgotPasswordScreen}
              exact
            />
            <Route path='/about' component={AboutMeScreen} exact />
            <Route path='/my-account' component={MyAccountScreen} exact />
            <Route path='/my-wallets' component={MyWalletsScreen} exact />
            <Route path='/store' component={StoreScreen} exact />
            <Route path='/faq' component={FaqScreen} exact />
            <Route
              path='/my-wallets/page/:pageNumber'
              component={MyWalletsScreen}
              exact
            />

            <Route
              path='/wallets/:walletId/transactions'
              component={MyTransactionsScreen}
            />

            <Route path='/admin/users' component={UsersScreen} exact />
            <Route
              path='/admin/users/:pageNumber'
              component={UsersScreen}
              exact
            />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
