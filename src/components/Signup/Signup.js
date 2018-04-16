import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      login: '',
      mobilePhone: '',
      password: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }
  handleInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp (e) {
    e.preventDefault()
    axios.post('http://localhost:3001/users', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobilePhone: this.state.mobilePhone,
      password: this.state.password
    })
  }
  render () {
    return (
      <div className='form'>
        <h1>Sign Up</h1>

        {this.props.error && (
          <div className='error'>
            {this.props.error}
          </div>
          )}
        <form>
          <label>First Name</label>
          <input type='text' name='firstName' maxLength='25' onChange={this.handleInput} />
          <label>Last Name</label>
          <input type='text' name='lastName' maxLength='25' onChange={this.handleInput} />
          <label>Email</label>
          <input type='text' name='email' maxLength='25' onChange={this.handleInput} />
          <label>Login</label>
          <input type='text' name='login' maxLength='25' onChange={this.handleInput} />
          <label>Phone Number</label>
          <input type='text' name='mobilePhone' maxLength='25' onChange={this.handleInput} />
          <label>Password</label>
          <input type='password' name='password' maxLength='25' onChange={this.handleInput} />


          <input value='submit' type='submit' onClick={this.handleSignUp} />
        </form>
      </div>
    )
  }
  }

export default Signup
