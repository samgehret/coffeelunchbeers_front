import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'
import './Navigation.css'
import axios from 'axios'
import config from '../../app.config'

export default withAuth(class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: null,
      user: null,
      moreInfo: null,
      groups: null,
      isAdmin: null }

    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.moreUserInfo = this.moreUserInfo.bind(this)
    this.decideAdmin = this.decideAdmin.bind(this)
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
      })
  }

  async moreUserInfo () {
    axios.get(`${config.serverUrl}/users/${this.state.user.sub}`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((res) => {
      this.setState({moreInfo: res.data})
    })
    axios.get(`${config.serverUrl}/users/${this.state.user.sub}/groups`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((res) => {
      this.setState({groups: res.data})
      this.decideAdmin()
    })
  }

  decideAdmin () {
    let admin = this.state.groups.filter(group => group.id === '00geqqpub31y8X5p00h7')
    this.setState({admin: admin.length})
  }

  componentDidUpdate () {
    this.checkAuthentication()
  }

  render () {
    if (this.state.authenticated && this.state.moreInfo && this.state.admin === 1) {
      return (
        <nav>
          <div className='auth-nav'>
            <div className='link-item'><Link to='/'>Home</Link></div>
            <div className='link-item'><Link to='/coffee'>Coffee</Link></div>
            <div className='link-item'><Link to='/lunch'>Lunch</Link></div>
            <div className='link-item'><Link to='/beer'>Beer</Link></div>
          </div>
          <div className='auth-right'>
            <div className='welcome'>Welcome {this.state.moreInfo.profile.firstName}!</div>
            <div className='welcome'><Link to='/profile'>Profile</Link></div>
            <div className='welcome'><Link to='/admin'>Admin</Link></div>
            <div className='welcome'><a href='javascript:void(0)' onClick={this.props.auth.logout}>Logout</a></div>
          </div>

        </nav>
      )
    } else if (this.state.authenticated && this.state.moreInfo) {
      return (
        <nav>
          <div className='auth-nav'>
            <div className='link-item'><Link to='/profile'>Profile</Link></div>
            <div className='link-item'><Link to='/'>Home</Link></div>
            <div className='link-item'><Link to='/coffee'>Coffee</Link></div>
            <div className='link-item'><Link to='/lunch'>Lunch</Link></div>
            <div className='link-item'><Link to='/beer'>Beer</Link></div>
          </div>
          <div className='auth-right'>
            <div className='welcome'>Welcome {this.state.moreInfo.profile.firstName}!</div>
            <div className='welcome'><Link to='/profile'>Profile</Link></div>
            <div className='welcome'><a href='javascript:void(0)' onClick={this.props.auth.logout}>Logout</a></div>
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
            <div className='link-item'><Link to='/coffee'>Coffee</Link></div>
            <div className='link-item'><Link to='/lunch'>Lunch</Link></div>
            <div className='link-item'><Link to='/beer'>Beer</Link></div>
          </div>
        </nav>
      )
    }
  }
})
