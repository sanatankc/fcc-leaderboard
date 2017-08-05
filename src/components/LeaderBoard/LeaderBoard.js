import React from 'react'
import LeaderCard from '../LeaderCard/LeaderCard.js'
import './LeaderBoard.css'
const LeaderBoard = ({leaderboard, toggle}) =>
  <div className='LeaderBoard'>
    {leaderboard
      .map(({img, username, alltime, recent}, index) =>
        <LeaderCard
          index = {index}
          img = {img}
          username = {username}
          alltime = {alltime}
          recent = {recent}
          toggle = {toggle}
        />
    )}
  </div>

export default LeaderBoard
