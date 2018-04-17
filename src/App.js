import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SecureRoute, ImplicitCallback } from '@okta/okta-react'
import OktaAuth from '@okta/okta-auth-js'
import { withAuth } from '@okta/okta-react'

import Navigation from './components/shared/Navigation'
import HomePage from './components/Home/HomePage'
import RegistrationForm from './components/auth/RegistrationForm'
import config from './app.config'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/auth/ProfilePage'
import './App.css'

export default withAuth(class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: null,
      user: null,
      sessionToken: null,
      otherSessionToken: null,
      username: '',
      password: ''
    }
    this.oktaAuth = new OktaAuth({ url: config.url })
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.oktaAuth)
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => this.setState({
        sessionToken: res.sessionToken,
        otherSessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({error: err.message})
        console.log(err.statusCode + ' error', err)
      })
  }

  handleInput (e) {
    console.log(e.target.value)
    var value = e.target.value
    this.setState({[e.target.name]: value})
  }

  render () {
    console.log(this.state.sessionToken)
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken })
      return null
    }
    return (
      <div className='App'>
        <Navigation token={this.state.sessionToken} />
        <main>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' render={() => <LoginPage submit={this.handleSubmit} input={this.handleInput} token={this.state.sessionToken} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <Route path='/register' component={RegistrationForm} />
          <SecureRoute path='/profile' component={ProfilePage} />
        </main>
      </div>
    )
  }
})
