import React, { useState } from 'react';
import styles from './styles/NavBar.module.css';
import PlexifyIcon from '../assets/global/PlexifyIcon.svg';
import ProfileIcon from '../assets/NavBar/ProfileIcon.svg';
import signOutIcon from '../assets/NavBar/signOutIcon.svg';
import NavBox from './NavBox';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate()
  // const token = localStorage.getItem('token');

  function HandleSignOut() {
    localStorage.clear();
    navigate('/sign-in');
  }
  
  return (
    <div className={styles.container} >
      <div className={styles.tabContainer}>
        <div className={styles.plexifyIcon}>
          <img className={styles.logo} src={PlexifyIcon} alt="Plexify Icon" />
        </div>
        <NavBox />
      </div>
      <div className={styles.buttonContainer}>
        <button type='button' className={styles.profile} onClick={() => setIsClicked(!isClicked)}>
          <img src={ProfileIcon} alt="profile" />
        </button>
        <button type='button' className={styles.signOutButton} onClick={HandleSignOut} style={{
          display: !isClicked && 'none'
        }}>
          <img src={signOutIcon} alt="sign out" />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  )
}

export default NavBar
