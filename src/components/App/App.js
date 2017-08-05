import React, { Component } from 'react'
import './App.css'
import ReactLoading from 'react-loading'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import Footer from '../Footer/Footer.js'
import Toggle from '../Toggle/Toggle.js'
import LeaderBoard from '../LeaderBoard/LeaderBoard.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      toggle: 0,
      recentLeaders: [],
      allTimeLeaders: []
    }

    this.onToggleClick = this.onToggleClick.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
  }
  
  componentDidMount() {
    this.fetchUsers()
  }

  onToggleClick(event) {
    this.setState({
      toggle: +event.target.dataset.value
    })
  }
  fetchUsers() {
    // fetches all_time Leaders and sets it into state
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(response => response.json())
      .then(result => this.setState({allTimeLeaders : result}))
      .then(error => error)

    // fetches last_30_days Leaders and sets it into state
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => response.json())
      .then(result => this.setState({recentLeaders : result}))
      .then(error => error)
  }

  render() { 
    const {
      toggle,
      recentLeaders,
      allTimeLeaders
    } = this.state
    
    const isDataFetching = 
      recentLeaders.length === 0 || 
      allTimeLeaders.length === 0
    
    const leaderboard = toggle
      ? allTimeLeaders
      : recentLeaders
    return (
      <div className='App'>
        <Toggle 
          onToggleClick = {this.onToggleClick}
          toggle = {toggle}
        />
        {isDataFetching
          ? <div className='loading-container'>
              <ReactLoading 
                type='cylon' 
                color='#20b3e4'
                width='80'
                height= '64'/>
            </div> 
          : <LeaderBoard 
              leaderboard = {leaderboard}
              toggle = {toggle}
            />
        }
      <Footer />
      <GitHubForkRibbon 
        href="//www.github.com/sanatankumar/fcc-leaderboard"
        target="_blank"
        position="right">
        View Code On Github
      </GitHubForkRibbon>
      </div>
      )
  }
}

export default App
