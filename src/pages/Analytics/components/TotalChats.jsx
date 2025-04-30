import React from 'react'

const TotalChats = ({ totalChats }) => {
  return (
    <div style={{
        display: 'flex',
        width: '60%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2em'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em'
      }}>
        <h2>Total Chats</h2>
        <p style={{ fontSize: '0.85rem'}}>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
      </div>
      <p>{totalChats}</p>
    </div>
  )
}

export default TotalChats
