import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import { BsPlayCircle } from "react-icons/bs";

const HeroLeft = () => {
    const buttonStyles = {
        display: 'flex',
        gap: '0.5em',
        alignItems: 'center',
        padding: '1em'
    }
  return (
    <div style={{
        fontFamily: "Barlow",
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        color: '#30404D',
        width: '40%'
    }}>
      <h2>Grow Your Business Faster with Hubly CRM</h2>
      <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
      <div>
        <button style={{
            ...buttonStyles
        }}>
            <p>Get Started</p>
            <LuArrowRight />
        </button>
        <button style={{
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
