import React from 'react';
import styles from './styles/Funnel.module.css';
import { polyOne, polyThree, polyTwo, line, icons } from '../../../assets/lander/images';
import totalFunnel from '../../../assets/lander/totalFunnel.png'

const Funnel = () => {
  return (
    <div className={styles.container}>
      <img className={styles.icons} src={icons} alt="" />
      <div className={styles.funnel}>
        <img src={totalFunnel} alt="" />
      </div>
      {/* <div className={styles.funnel}>
        <img src={polyOne} alt="" />
        <img src={polyTwo} alt=""  />
        <img src={polyThree} alt="" />
      </div> */}
    </div>
  )
}

export default Funnel
