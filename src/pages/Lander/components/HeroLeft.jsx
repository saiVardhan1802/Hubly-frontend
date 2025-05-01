import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import { BsPlayCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const HeroLeft = () => {
  const navigate = useNavigate();
    const buttonStyles = {
        display: 'flex',
        gap: '0.5em',
        alignItems: 'center',
        padding: '1em',
        borderRadius: '8px'
    }
  return (
    <div style={{
        fontFamily: "Barlow",
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        color: '#30404D',
        width: '40%',
        marginTop: '5%'
    }}>
      <h2 style={{
        fontSize: '2.5rem'
      }}>Grow Your Business Faster with Hubly CRM</h2>
      <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
      <div style={{
        display: 'flex',
        gap: '1em'
      }}>
        <button type='button' onClick={() => navigate('/sign-up')} style={{
            ...buttonStyles,
            backgroundColor: '#244779',
            color: 'white'
        }}>
            <p>Get Started</p>
            <LuArrowRight />
        </button>
        <button type='button' style={{
            ...buttonStyles
        }}>
            <BsPlayCircle />
            <p>Watch Video</p>
        </button>
      </div>
    </div>
  )
}

export default HeroLeft
