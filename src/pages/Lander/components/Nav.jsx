import React from 'react';
import PlexifyIcon from '../../../assets/global/PlexifyIcon.svg';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const buttonStyles = {
        borderRadius: '8px',
        padding: '0.7em 1em'
    };

    const navigate = useNavigate();

  return (
    <div style={{
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 auto'
      }}>
      <div style={{
        display: 'flex',
        color: '#184E7F'
      }}>
        <img src={PlexifyIcon} alt="plexify icon" />
        <h1>Hubly</h1>
      </div>
      <div style={{
        display: 'flex',
        gap: '0.5em'
      }}>
        <button type='button' onClick={() => navigate('/sign-in')} style={{
            ...buttonStyles
        }}><p>Login</p></button>
        <button type='button' onClick={() => navigate('/sign-up')} style={{
            ...buttonStyles,
            backgroundColor: '#244779',
            color: 'white'
        }}><p>Signup</p></button>
      </div>
    </div>
  )
}

export default Nav
