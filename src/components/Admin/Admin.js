import React from 'react'
import { withAuth } from '@okta/okta-react'
import axios from 'axios'

export default withAuth(class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
    this.getAllUsers = this.getAllUsers.bind(this)
  }

  async getAllUsers () {
    axios.get(`http://localhost:3001/users/list`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
      .then((users) => {
        this.setState({users: users.data})
        console.log(this.state.users)
      })
  }

  componentDidMount () {
    this.getAllUsers()
  }

  render () {
    var users = this.state.users.map((user, i) => {
      return (
             user.profile.firstName

      )
    })
    return (
      <div>
        <h1>This will be an admin page</h1>

        <div>
          {users}
        </div>
      </div>
    )
  }
})
