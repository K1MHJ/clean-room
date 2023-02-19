import './App.css'
import React, { Component } from 'react'
import Room from './components/Room.js'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='App'>
        <Room></Room>
      </div>
    )
  }
}

export default App
