import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './styles/ChatsComponent.module.css';
import { getMessages, getTicketsById } from '../../../services';
import { SetUserContext, UserContext } from '../../../services/Context/UserContext';
import imageOne from '../../../assets/contact-center/imageOne.svg';
import imageTwo from '../../../assets/contact-center/imageTwo.svg';
import { pickRandomImage } from '../../Team';
import toast from 'react-hot-toast';

const ChatsComponent = ({ tickets, selectedTicketId, setSelectedTicketId, setChatTitle, leavingMessage }) => {
  // const [tickets, setTickets] = useState([]);
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);
  const token = localStorage.getItem("token");
  const images = [imageOne, imageTwo];
  const [chatMessages, setChatMessages] = useState();

  
  const sortedTickets = useMemo(() => {
    return tickets.slice().sort((a, b) => {
      const aUn = a.status === 'unresolved';
      const bUn = b.status === 'unresolved';
      if (aUn && !bUn) return -1;        // a unresolved, b resolved => a first
      if (!aUn && bUn) return 1;         // b unresolved, a resolved => b first
      // same status, so latest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tickets]);


  function handleSelectedTicket(ticket) {
    setSelectedTicketId(ticket._id);
  }

  // useEffect(() => console.log("Tickets: ", tickets), [tickets]);
  // useEffect(() => console.log('selcted ticket: ', selectedTicketId), [selectedTicketId]);
  // useEffect(() => console.log("Selected chats: ", chatMessages), [chatMessages]);

  return (
    <div className={styles.container}>
      <h1>Contact Center</h1>
      <div className={styles.header}>
        <div>
          <p>Chats</p>
        </div>
      </div>
      {/* {!tickets?.lenght === 0 ? */}
      <div className={styles.ticketsContainer}>
        {sortedTickets.map((ticket, index) => (
          <button type='button' className={ticket._id === selectedTicketId ? styles.clickedButton : ''} 
            key={index}  
            onClick={() => {
              handleSelectedTicket(ticket);
              setChatTitle(`Chat ${index + 1}`);
            }}
          >
            <div className={`${styles.chatBox}`}
              style={{
                backgroundColor: ticket._id === selectedTicketId ? '#EFEFEF' : 'transparent'
              }}
            >
              <img src={pickRandomImage(images)} alt={`Visitor ${index} profile`} />
              <div>
                <p className={styles.chatTitle}>{`Chat ${index + 1}`}</p>
                <p className={styles.lastChat}>{!leavingMessage? ticket.lastChat : `No longer have access`}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* :
      <div className={styles.empty}>
        <p>Nothing to show here</p>
      </div>
      } */}
    </div>
  )
}

export default ChatsComponent
