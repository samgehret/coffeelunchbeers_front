import React, { Component } from 'react'
import Navbar from './Navbar/Navbar'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Home from './Home/Home'
import Signup from './Signup/Signup'
class App extends Component {
  render () {
    return (

      <div className='app'>
        <div className='main'>
          <Navbar />
          <Switch>
            <Route exact path='/home' render={() => <Home />} />
            <Route exact path='/signup' render={() => <Signup />} />
            
            
            <Route path='/*'
              render={() => {
                return (
                  <Redirect to='/home' />
                )
              }}
              />
          </Switch>
        </div>
      </div>

    )
  }
}

export default withRouter(App)
