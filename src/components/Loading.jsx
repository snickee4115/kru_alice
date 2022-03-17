import React from 'react'
import Load from '../assets/loading.gif'

const Loading = () => {
  return (
    <div style={{
        all:'unset',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff'
        
      }}>
        <img src={Load}/>
      </div>
  )
}

export default Loading