import React from 'react'
import './Toggle.css'
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

export default Toggle
