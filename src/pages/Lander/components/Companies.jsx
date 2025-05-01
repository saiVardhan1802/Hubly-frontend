import React from 'react';
// import { adobeIcon, elasticIcon, openDoorIcon, airTableIcon, framerIcon } from '../../../assets/lander/images';
import adobeIcon from '../../../assets/lander/adobeIcon.png'
import openDoorIcon from '../../../assets/lander/openDoorIcon.png'
import airTableIcon from '../../../assets/lander/airTableIcon.png'
import framerIcon from '../../../assets/lander/framerIcon.png'
import elasticIcon from '../../../assets/lander/elasticIcon.png'

const Companies = () => {
    const companies = [adobeIcon, elasticIcon, openDoorIcon, airTableIcon, framerIcon];
  return (
    <div style={{ 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#184E7F',
        opacity: '0.6',
        marginTop: '20%',
    }}>
      {companies.map((company, index) => (
        <img src={company} key={index} alt=""/>
      ))}
    </div>
  )
}

export default Companies
