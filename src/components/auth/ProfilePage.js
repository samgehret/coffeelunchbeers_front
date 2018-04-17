import React from 'react'
import { withAuth } from '@okta/okta-react'
import axios from 'axios'

export default withAuth(class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      data: null }
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  async getCurrentUser () {
    this.props.auth.getUser()
      .then(user => {
        this.setState({user})
        console.log(user)
      })
  }

  getUsers () {
    console.log('suh')
  }

//   async componentDidMount () {
//       console.log('suh')
//     axios.get('https://dev-320743.oktapreview.com/api/v1/users',
//       {
//         headers: {
//           Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
//         }
//       })
//       .then((res) => console.log(res))
//   }

  async componentDidMount () {
    this.getCurrentUser()
    this.getUsers()
    // var token = await this.props.auth.getAccessToken()
    // console.log(token)
    try {
      const response = await fetch('http://localhost:3001/users/list', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
      const data = await response.json()
      this.setState({ data: data })
      console.log(data)
    } catch (err) {

        // handle error as needed
    }
  }

  render () {
    if (!this.state.user) return null
    return (
      <section className='user-profile'>
        <h1>User Profile</h1>
        <div>
          <p>{this.state.messages}</p>
          <label>Name:</label>
          <span>{this.state.user.name}</span>
        </div>
      </section>

    )
  }
})
