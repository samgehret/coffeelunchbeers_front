import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom'

export default withAuth(class Home extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    var token = await this.props.auth.getAccessToken()
    console.log(token)
    console.log('home')
    try {
      const response = await fetch('http://localhost:3001/users/list', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (err) {

        // handle error as needed
    }
  }

      // handle error as needed

  render () {
    return (
      <div className='home'>
        <h1> COFFEE LUNCH BEERS</h1>
        <p>Welcome to COFFEE, LUNCH, BEERS. An App for GA Students, by GA Students</p>

      </div>
    )
  }
  })
