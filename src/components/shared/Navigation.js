import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'

export default withAuth(class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = { authenticated: null }
    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.checkAuthentication()
  }

  async checkAuthentication () {
    const authenticated = await this.props.auth.isAuthenticated()
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
    }
  }

  componentDidUpdate () {
    this.checkAuthentication()
  }

  render () {
    if (this.state.authenticated) {
      return (
        <nav>
          <div className='auth-nav'>
            <div className='link-item'><Link to='/profile'>Profile</Link></div>
            <div className='link-item'><Link to='/'>Home</Link></div>
            <div className='link-item'><a href='javascript:void(0)' onClick={this.props.auth.logout}>Logout</a></div>
            <div className='welcome'>Welcome!</div>
          </div>
        </nav>
      )
    } else {
      return (
        <nav>
          <div className='auth-nav'>
            <div className='link-item'><Link className='nav-link' to='/login'> Login </Link></div>
            <div className='link-item'><Link to='/register'>Register</Link></div>
            <div className='link-item'><Link to='/'>Home</Link></div>
            <div className='link-item'><a href='javascript:void(0)' onClick={this.props.auth.logout}>Logout</a></div>
          </div>
        </nav>

      )
    }
  }
})
