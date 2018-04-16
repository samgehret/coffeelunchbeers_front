import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render () {
        // this code could be a LOT cleaner
        // This if statement makes it so that it only renders certain nav
        // options when the user is logged in

    return (
      <div>
        <nav className='nav'>
          <Link className='nav-link' to='/home'>Home</Link>
          <Link className='nav-link' to='/signup'> Signup </Link>
        </nav>
      </div>
    )
  }
  }

export default Navbar
