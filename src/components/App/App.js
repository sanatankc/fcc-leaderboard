import React, { Component } from 'react'
import './App.css'
import ReactLoading from 'react-loading'


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
          : <Leaderboard 
              leaderboard = {leaderboard}
              toggle = {toggle}
            />
        }
      </div>
      )
  }
}

const Toggle = ({onToggleClick, toggle}) => {
  const activeButtonStyle = {
    backgroundColor: '#20b3e4',
    color: 'white',
  }
  const InactiveButtonStyle = {
    backgroundColor: 'transparent',
    color: '#20b3e4',
  }
  const styleIfActive1 = (toggle === 0)
    ? activeButtonStyle
    : InactiveButtonStyle

  const styleIfActive2 = (toggle === 1)
    ? activeButtonStyle
    : InactiveButtonStyle

  return (
    <div className='Toggle'>
      <a
        onClick = {onToggleClick}
        data-value={0} 
        style={styleIfActive1}>Last 30 days</a>
      <a 
        onClick = {onToggleClick}
        data-value={1}
        style={styleIfActive2}>All Time</a>
    </div>
  )
}
const Leaderboard = ({leaderboard, toggle}) =>
  <div className='LeaderBoard'>
    {leaderboard
      .map(({img, username, alltime, recent}, index) =>
        <a href={`https://www.github.com/${username}`} 
            target='_blank' 
            key={index}>
          <div className='board'>
            <div 
              className='leader-image'
              style = {{
                backgroundImage: `url(${img})`
              }}>
                <div className='image-overlay'></div>
            </div>
            <p className='username'>{index + 1}. {username}</p>
            {toggle
              ? <div>
                  <p className='label'>All time Scores</p>
                  <p className='scores'>{alltime}</p>
                  <p className='label'>Last 30 Days</p>
                  <p className='scores'>{recent}</p>
                </div>
              : <div>
                  <p className='label'>Last 30 Days</p>
                  <p className='scores'>{recent}</p>
                  <p className='label'>All time Scores</p>
                  <p className='scores'>{alltime}</p>
                </div>
            }
          </div>
        </a>
    )}
  </div>
export default App
