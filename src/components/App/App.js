import React, { Component } from 'react'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      toggle: 0
    }
    this.onToggleClick = this.onToggleClick.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
  }
  
  onToggleClick(event) {
    this.fetchUsers()
    this.setState({toggle: event.target.value})
  }

  fetchUsers(url) {
    const {toggle} = this.state
    toggle 
      ? fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
          .then(response => response.json())
          .then(result => console.log(result))
          .then(error => console.log(error))
      : fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
          .then(response => response.json())
          .then(result => console.log(result))
          .then(error => console.log(error))
  }

  render() { 
    console.log(this.state.toggle)
    return (
      <div className='App'>
        <Heading />
        <Toggle 
          onToggleClick = {this.onToggleClick}
        />
      </div>
      )
  }
}

const Heading = () => 
  <h1 style={{
        color : '#999',
        opacity: '0.7',
        textAlign: 'center'
      }}>FCC Leaderboard</h1> 

const Toggle = ({onToggleClick}) =>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
  }}>
    <button onClick = {onToggleClick} value={0}>Last 30 days </button>
    <button  onClick = {onToggleClick} value={1}>All Time</button>
  </div>

export default App
