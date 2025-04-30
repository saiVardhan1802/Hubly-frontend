import React, { useContext, useEffect, useState } from 'react';
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

  // useEffect(() => {
  //   try {
  //     async function fetchTickets() {
  //       const response = await getTicketsById(user.id, token);
  //       if (!response.ok) {
  //         return toast.error("Failed to fetch events. Please try again.");
  //       }
  //       const data = await response.json();
  //       const ticketsFromServer = data.tickets;
  //       setTickets(ticketsFromServer);
  //     }

  //     fetchTickets();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);


  // const [selectedTicketId, setSelectedTicketId] = useState(() => {
  //   const storedId = localStorage.getItem('selectedTicketId');
  //   if (storedId) {
  //     console.log("StoredId: ", storedId);
  //     return storedId;
  //   } else if (tickets.length > 0) {
  //     return tickets[0]._id;
  //   } else {
  //     return null;
  //   }
  // });

  // useEffect(() => {
  //   if (tickets.length > 0 && !selectedTicketId) {
  //     setSelectedTicketId(tickets[0]._id);
  //   }
  // }, [tickets]);

  // useEffect(() => {
  //   if (!selectedTicketId || tickets.length === 0) return;
  
  //   const selectedTicket = tickets.find(ticket => ticket._id === selectedTicketId);
    
  //   if (!selectedTicket) return;
  
  //   console.log(selectedTicket);
  
  //   async function fetchMessages() {
  //     try {
  //       const response = await getMessages(selectedTicket.visitorId);
  //       if (!response.ok) return toast.error('Failed to fetch messages. Please try again.');
  //       const data = await response.json();
  //       const messagesFromApi = data.messages;
  //       console.log(messagesFromApi);
  //       setChatMessages(messagesFromApi);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   fetchMessages();
  // }, [selectedTicketId, tickets]);  



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
        {tickets?.map((ticket, index) => (
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
