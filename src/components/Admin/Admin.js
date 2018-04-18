import React from 'react'
import { withAuth } from '@okta/okta-react'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default withAuth(class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      userRoles: []
    }
    this.getAllUsers = this.getAllUsers.bind(this)
    this.getAllUserGroups = this.getAllUserGroups.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
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
        console.log('users')
        console.log(this.state.users)
        this.getAllUserGroups()
      })
  }

  deleteUser (userid) {
    console.log('DELETING')
    axios.delete(`http://localhost:3001/users/${userid}/delete`)
  }

  async getAllUserGroups () {
    for (let user of this.state.users) {
    //   console.log('hi')
      axios.get(`http://localhost:3001/users/${user.id}/groups`,
        {
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
        })
        .then((user) => {
          let newUserRoles = this.state.userRoles.slice()
          newUserRoles.push(user.data)
          this.setState({userRoles: newUserRoles})
        //   console.log('user role while loop')
        //   console.log(this.state.userRoles)
        })
    }
    console.log('user roles')
    console.log(this.state.userRoles)
  }

  componentDidMount () {
    this.getAllUsers()
  }

  render () {
    var users = this.state.users.map((user, i) => {
      return (
        <div className='user'>
          {user.profile.firstName} {user.profile.lastName} {user.profile.email} {user.id} <a href='javascript:void(0)' onClick={() => this.deleteUser(user.id)} >Test</a>
        </div>

      )
    })
    return (
      <div>
        <h1>This will be an admin page</h1>

        <div className='usercontainer'>
          {users}
        </div>
      </div>
    )
  }
})

// const columns = [{
//     Header: 'Name',
//     accessor: 'profile.firstName' // String-based value accessors!
//   }, {
//     Header: 'Last Name',
//     accessor: 'profile.lastName',
//     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
//   }, {
//     Header: 'Email',
//     accessor: 'profile.email',
//     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
//   }, {
//     Header: 'ID',
//     accessor: 'id',
//     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
//   }]
//   return (
//     <div>
//       <h1>List of Users</h1>

//       <ReactTable
//         data={this.state.users}
//         columns={columns}
//     />
//     </div>
//   )
