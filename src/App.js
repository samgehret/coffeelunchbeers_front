import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SecureRoute, ImplicitCallback, withAuth } from '@okta/okta-react'
import Navigation from './components/shared/Navigation'
import HomePage from './components/Home/HomePage'
import RegistrationForm from './components/auth/RegistrationForm'
import config from './app.config'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/auth/ProfilePage'
import Admin from './components/Admin/Admin'
import Coffee from './components/Coffee/Coffee'
import Lunch from './components/Lunch/Lunch'
import Beer from './components/Beer/Beer'
import './App.css'

export default withAuth(class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        <main>

          <Route path='/login' render={() => <LoginPage baseUrl={config.url} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <Route path='/register' component={RegistrationForm} />
          <Route path='/coffee' component={Coffee} />
          <Route path='/lunch' component={Lunch} />
          <Route path='/beer' component={Beer} />
          <SecureRoute exact path='/profile' component={ProfilePage} />
          <SecureRoute exact path='/admin' component={Admin} />
          <Route path='/' exact component={HomePage} />
        </main>
      </div>
    )
  }
})
