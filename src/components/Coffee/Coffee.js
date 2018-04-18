import React from 'react'
import axios from 'axios'

export default class Coffee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coffeeShops: []
    }
    this.getCoffee = this.getCoffee.bind(this)
  }

  getCoffee () {
    axios.get('http://localhost:3001/coffee')
    .then((res) => {
      this.setState({coffeeShops: res.data})
      console.log()
    })
  }

  componentDidMount () {
    this.getCoffee()
  }

  render () {
    var coffeespots = this.state.coffeeShops.map((shop, i) => {
      return (
        <div key={i}>
          {shop.name}
        </div>
      )
    })
    console.log(coffeespots)
    return (
      <div>
        <h1>This will be the coffee page!</h1>
        {coffeespots}
      </div>
    )
  }
}
