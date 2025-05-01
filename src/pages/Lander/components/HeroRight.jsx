import React from 'react';
import styles from './styles/HeroRight.module.css';
import { Calendar, jerry, people, sales } from '../../../assets/lander/images';

const HeroRight = () => {
  return (
    <div className={styles.container}>
      <img src={people} alt="" className={styles.people} />
      <div>
        <img src={jerry} alt="" />
        <div>
            <p >Jerry Calzoni <span style={{ color: "#2F73AA"}}>joined</span> Swimming</p>
            <p style={{ fontSize: '0.8rem', color: '#9DA8B0' }}>Class -  9:22 AM</p>
        </div>
      </div>
        <img src={Calendar} alt="" className={styles.calendar} />
        <img src={sales} alt="" className={styles.sales} />
    </div>
  )
}

export default HeroRight
