import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'
import './Navigation.css'
import axios from 'axios'

export default withAuth(class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: null,
      user: null,
      moreInfo: null,
      groups: null }

    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.moreUserInfo = this.moreUserInfo.bind(this)
    this.checkAuthentication()
  }

  async checkAuthentication () {
    const authenticated = await this.props.auth.isAuthenticated()
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
      if (authenticated) {
        this.getCurrentUser()
      }
    }
  }

  async getCurrentUser () {
    this.props.auth.getUser()
      .then(user => {
        this.setState({user})
        this.moreUserInfo()
        console.log(this.state.user.name)
      })
  }

  async moreUserInfo () {
    axios.get(`http://localhost:3001/users/${this.state.user.sub}`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((res) => {
      this.setState({moreInfo: res.data})
      console.log(this.state.moreInfo)
    })
    axios.get(`http://localhost:3001/users/${this.state.user.sub}/groups`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((res) => {
      console.log('getting here')
      this.setState({groups: res.data})
      console.log(this.state.groups)
    })
  }

  componentDidUpdate () {
    this.checkAuthentication()
  }

  render () {
    if (this.state.authenticated && this.state.moreInfo) {
      return (
        <nav>
          <div className='auth-nav'>
            <div className='link-item'><Link to='/profile'>Profile</Link></div>
            <div className='link-item'><Link to='/'>Home</Link></div>
            <div className='link-item'><Link to='/admin'>Admin</Link></div>
            <div className='link-item'><a href='javascript:void(0)' onClick={this.props.auth.logout}>Logout</a></div>
            <div className='welcome'>Welcome {this.state.moreInfo.profile.firstName}!</div>
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
          </div>
        </nav>

      )
    }
  }
})
