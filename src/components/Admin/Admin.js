import React from 'react'
import { withAuth } from '@okta/okta-react'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import config from '../../app.config'

export default withAuth(class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      admins: [],
      user: null,
      moreInfo: null,
      groups: null,
      isAdmin: null
    }
    this.getAllUsers = this.getAllUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.getAllAdmin = this.getAllAdmin.bind(this)
    this.newAdmin = this.newAdmin.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.moreUserInfo = this.moreUserInfo.bind(this)
    this.decideAdmin = this.decideAdmin.bind(this)
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
      console.log('GRPUPS')
      console.log(this.state.groups)
      this.decideAdmin()
    })
  }

  decideAdmin () {
    let admin = this.state.groups.filter(group => group.id === '00geqqpub31y8X5p00h7')
    this.setState({isAdmin: admin.length})
    console.log('ADMIN CHECK')
    console.log(this.state.isAdmin)
  }

  async getAllUsers () {
    axios.get(`${config.serverUrl}/users/list`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
      .then((users) => {
        this.setState({users: users.data})
        // console.log('users')
        // console.log(this.state.users)
        // this.getAllUserGroups()
      })
  }

  async getAllAdmin () {
    axios.get(`${config.serverUrl}/users/admin`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((admins) => {
      this.setState({admins: admins.data})
      console.log('admins')
      console.log(this.state.admins)
      // this.getAllUserGroups()
    })
  }

  deleteAdmin (userid) {
    console.log('DELETINNG ADMIN')
    axios.delete(`${config.serverUrl}/users/admin/remove/${userid}`)
    .then(this.getAllAdmin())
    // window.location.reload()
  }

  deleteUser (userid) {
    console.log('DELETING')
    axios.delete(`${config.serverUrl}/users/${userid}/delete`)
    .then(this.getAllUsers())
    window.location.reload()
  }

  newAdmin (userid) {
    console.log('MAKING ADMIN')
    axios.put(`${config.serverUrl}/users/admin/new/${userid}`)
    .then(this.getAllAdmin())
    window.location.reload()
  }

  componentWillMount () {
    this.getCurrentUser()
    this.getAllUsers()
    this.getAllAdmin()
  }

  render () {
  //   var users = this.state.users.map((user, i) => {
  //     return (
  //       <div className='user'>
  //         {user.profile.firstName} {user.profile.lastName} {user.profile.email} {user.id}<a href='javascript:void(0)' onClick={() => this.deleteUser(user.id)} >Delete</a> <a href='javascript:void(0)' onClick={() => this.newAdmin(user.id)}>Make Admin</a>
  //       </div>

  //     )
  //   })
  //   var admins = this.state.admins.map((admin, i) => {
  //     return (
  //       <div className='user'>
  //         {admin.profile.firstName} {admin.profile.lastName} {admin.profile.email} {admin.id} <a href='javascript:void(0)' onClick={() => this.deleteAdmin(admin.id)} > DELETE ADMIN </a>
  //       </div>
  //     )
  //   })

  //   if (this.state.isAdmin === 1) {
  //     return (
  //       <div>
  //         <h1>All Users</h1>

  //         <div className='usercontainer'>
  //           {users}
  //         </div>
  //         <h1>All Admin</h1>

  //         <div className='usercontainer'>
  //           {admins}
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <p>No access to this page</p>
  //     )
  //   }
  // }
    // const data = [{
    //   name: 'Tanner Linsley',
    //   age: 26,
    //   friend: {
    //     name: 'Jason Maurer',
    //     age: 23
    //   }
    // }]

      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    let data = this.state.admins
    let allUsers = this.state.users
    console.log(data.length)
    return (
      <div>
        <h1>Admin List</h1>
        <ReactTable
          data={data}
          columns={[{
            Header: 'First Name',
            accessor: 'profile.firstName' // String-based value accessors!
          }, {
            Header: 'Last Name',
            accessor: 'profile.lastName'
          },
          {
            Header: 'Email',
            accessor: 'profile.email' // String-based value accessors!
          },
          {
            Header: 'Admin Status',
            accessor: 'profile.id',
            Cell: e => <a href='javascript:void(0)' onClick={() => this.deleteAdmin(data[e.index].id)} > DELETE ADMIN </a>
          }]}
          defaultPageSize={5}
          showPagination={false}
        />

        <h1>All Users</h1>
        <ReactTable
          data={allUsers}
          columns={[{
            Header: 'First Name',
            accessor: 'profile.firstName' // String-based value accessors!
          }, {
            Header: 'Last Name',
            accessor: 'profile.lastName'
          },
          {
            Header: 'Email',
            accessor: 'profile.email' // String-based value accessors!
          },
          {
            Header: 'Admin Status',
            accessor: 'profile.id',
            Cell: e => <a href='javascript:void(0)' onClick={() => this.newAdmin(allUsers[e.index].id)}>MAKE ADMIN</a>
          },
          {
            Header: 'Delete User',
            accessor: 'profile.id',
            Cell: e => <a href='javascript:void(0)' onClick={() => this.deleteUser(allUsers[e.index].id)}>DELETE</a>
          }]}
          defaultPageSize={10}
          showPagination={false}
/>
      </div>
    )
  }
})
