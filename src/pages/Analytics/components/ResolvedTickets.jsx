import React from 'react'
import ProgressBar from './ProgressBar'

const ResolvedTickets = ({ percentage }) => {
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
        <h2>Resolved Tickets</h2>
        <p style={{ fontSize: '0.85rem'}}>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
      </div>
      <ProgressBar percentage={percentage} />
    </div>
  )
}

export default ResolvedTickets
