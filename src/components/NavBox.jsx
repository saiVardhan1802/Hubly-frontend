import React, { useEffect, useState } from 'react';
import DashboardIcon from '../assets/NavBar/DashboardIcon.svg';
import ContactCenterIcon from '../assets/NavBar/ContactCenterIcon.svg';
import ChatbotIcon from '../assets/NavBar/ChatbotIcon.svg';
import AnalyticsIcon from '../assets/NavBar/AnalyticsIcon.svg';
import TeamsIcon from '../assets/NavBar/TeamsIcon.svg';
import SettingsIcon from '../assets/NavBar/SettingsIcon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles/NavBox.module.css';

const NavBox = () => {
  const pagesWithIcons = {
    Dashboard: DashboardIcon,
    "Contact Center": ContactCenterIcon,
    Analytics: AnalyticsIcon,
    "Chat Bot": ChatbotIcon,
    Team: TeamsIcon,
    Settings: SettingsIcon,
  };

  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname.slice(1);
  const activePage = Object.keys(pagesWithIcons).find(
    page => page.replaceAll(" ", "-").toLowerCase() === activePath
  );

  return (
    <>
      {Object.entries(pagesWithIcons).map(([page, icon], index) => (
        <div
          className={styles.pageBox}
          onClick={() =>
            navigate(`/${page.replaceAll(" ", "-").toLowerCase()}`)
          }
          key={index}
        >
          <img src={icon} alt={`${page} icon`} />
          <p style={{ display: activePage !== page && "none" }}>{page}</p>
        </div>
      ))}
    </>
  );
};

export default NavBox;
