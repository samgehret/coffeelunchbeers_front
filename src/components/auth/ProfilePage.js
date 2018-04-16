import React from 'react'
import { withAuth } from '@okta/okta-react'
import axios from 'axios'

export default withAuth(class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { user: null }
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.getAUser = this.getAUser.bind(this)
}

  async getCurrentUser () {
    this.props.auth.getUser()
      .then(user => {
        this.setState({user})
        console.log(user)
      })
  }

  getAUser () {
    axios.get('https://dev-320743.oktapreview.com/api/v1/users',
    {headers: {authorization: 'SSWS 002ml4zCt6VpTP_akzJ9jdOBWRoUw5TDG_OyjOSlMR'}})
    .then((list) => console.log(list))
  }

  componentDidMount () {
    this.getCurrentUser()
    this.getAUser()
  }

  render () {
    if (!this.state.user) return null
    return (
      <section className='user-profile'>
        <h1>User Profile</h1>
        <div>
          <label>Name:</label>
          <span>{this.state.user.name}</span>
        </div>
      </section>

    )
  }
})
