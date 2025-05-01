import React from 'react';

const AverageReplyTime = ({ averageReplyTimeInSecs }) => {
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
        gap: '1em',
        width: '85%'
      }}>
        <h2 style={{ 
            color: '#00D907' ,
            fontSize: '1.7rem',
            fontWeight: '600'
        }}>Average Reply Time</h2>
        <p style={{ fontSize: '0.85rem'}}>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>
      </div>
      <p style={{
        fontSize: '1.5rem',
        color: '#00D907'
      }}>{formatReplyTime(averageReplyTimeInSecs)}</p>
    </div>
  )
}

function formatReplyTime(seconds) {
    if (seconds < 60) {
        return `${Math.floor(seconds)} sec${seconds === 1 ? '' : 's'}`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min${minutes === 1 ? '' : 's'}`;
    } else {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hr${hours === 1 ? '' : 's'}`;
    }
}

export default AverageReplyTime
