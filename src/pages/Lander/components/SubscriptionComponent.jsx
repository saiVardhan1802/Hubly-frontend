import React from 'react';
import styles from './styles/SubscriptionComponent.module.css'
import { tickIcon } from '../../../assets/lander/images';
import { useNavigate } from 'react-router-dom';

const SubscriptionComponent = ({ title, description, price, listItems }) => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
          <h4>{title}</h4>
          <p style={{
            marginTop: '1em',
            fontSize: '1.2rem'
          }}>{description}</p>

          <p style={{
            marginTop: '1.5em'
          }}><span style={{
            fontSize: '2.2rem',
            color: '#3A7ABD',
            fontWeight: 'bold'
          }}>{price}</span> <span>/monthly</span></p>

          <p style={{
                marginTop: '1em'
              }}>
              <strong >What's included</strong>
          </p>
          <ul>
            {listItems.map((item, index) => (
                <li key={index}>
                    <div><img src={tickIcon} alt="" /></div>
                    <p>{item}</p>
                </li>
            ))}
          </ul>
      </div>
      <button onClick={() => navigate('/sign-up')}>SIGN UP FOR {title}</button>
    </div>
  )
}

export default SubscriptionComponent
