import React from 'react'
import './LeaderCard.css'
const LeaderCard = 
  ({index, img, username, alltime, recent, toggle}) => 
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

export default LeaderCard
