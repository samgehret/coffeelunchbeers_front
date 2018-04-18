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
    axios.get(`http://localhost:3001/users/${this.state.user.sub}`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((res) => {
      this.setState({moreInfo: res.data})
    })
    axios.get(`http://localhost:3001/users/${this.state.user.sub}/groups`,
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
    this.setState({admin: admin.length})
    console.log('ADMIN CHECK')
    console.log(this.state.isAdmin)
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
        // this.getAllUserGroups()
      })
  }

  async getAllAdmin () {
    axios.get(`http://localhost:3001/users/admin`,
      {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
    .then((admins) => {
      this.setState({admins: admins.data})
      console.log('users')
      console.log(this.state.admins)
      // this.getAllUserGroups()
    })
  }

  deleteAdmin (userid) {
    console.log('DELETINNG ADMIN')
    axios.delete(`http://localhost:3001/users/admin/remove/${userid}`)
    .then(this.getAllAdmin())
    window.location.reload()
  }

  deleteUser (userid) {
    console.log('DELETING')
    axios.delete(`http://localhost:3001/users/${userid}/delete`)
    .then(this.getAllUsers())
    window.location.reload()
  }

  newAdmin (userid) {
    console.log('MAKING ADMIN')
    axios.put(`http://localhost:3001/users/admin/new/${userid}`)
    .then(this.getAllAdmin())
    window.location.reload()
  }

  componentDidMount () {
    // this.getCurrentUser()
    this.getAllUsers()
    this.getAllAdmin()
  }

  render () {
    var users = this.state.users.map((user, i) => {
      return (
        <div className='user'>
          {user.profile.firstName} {user.profile.lastName} {user.profile.email} {user.id}<a href='javascript:void(0)' onClick={() => this.deleteUser(user.id)} >Delete</a> <a href='javascript:void(0)' onClick={() => this.newAdmin(user.id)}>Make Admin</a>
        </div>

      )
    })
    var admins = this.state.admins.map((admin, i) => {
      return (
        <div className='user'>
          {admin.profile.firstName} {admin.profile.lastName} {admin.profile.email} {admin.id} <a href='javascript:void(0)' onClick={() => this.deleteAdmin(admin.id)} > DELETE ADMIN </a>
        </div>
      )
    })
    return (
      <div>
        <h1>All Users</h1>

        <div className='usercontainer'>
          {users}
        </div>
        <h1>All Admin</h1>

        <div className='usercontainer'>
          {admins}
        </div>
      </div>
    )
  }
})
