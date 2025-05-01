import React, { useEffect, useState } from 'react';
import styles from '../styles/Analytics.module.css';
import NavBar from '../../components/NavBar';
import Chart from './components/Chart';
import AverageReplyTime from './components/AverageReplyTime';
import ResolvedTickets from './components/ResolvedTickets';
import TotalChats from './components/TotalChats';
import { getAnalytics } from '../../services';
import toast from 'react-hot-toast';

const Analytics = () => {
  const token = localStorage.getItem('token');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await getAnalytics(token);
        if (!response.ok) {
          // toast.error('Failed to fetch analytics. Please try again');
          return;
        }
        const data = await response.json();
        setAnalytics(data.Analytics);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchAnalytics();
  }, []);  

  useEffect(() => console.log(analytics), [analytics])
  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.main}>
        <h1>Analytics</h1>
        <h2 style={{
          marginTop: '2em'
        }}>Missed Chats</h2>
        <Chart data={analytics?.missedChats} />
        <AverageReplyTime averageReplyTimeInSecs={analytics?.averageReplyTime} />
        <ResolvedTickets percentage={analytics?.percentageOfResolvedTickets} />
        <TotalChats totalChats={analytics?.totalChats} />
      </div>
    </div>
  )
}

export default Analytics
