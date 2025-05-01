import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import styles from '../styles/ContactCenter.module.css'
import ChatsComponent from './components/ChatsComponent';
import ChatViewer from './components/ChatViewer';
import ChatDetails from './components/ChatDetails';
import { getTicketsById } from '../../services';
import toast from 'react-hot-toast';
import { SetUserContext, UserContext } from '../../services/Context/UserContext';

const ContactCenter = () => {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('token');
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);
  const [chatTitle, setChatTitle] = useState(localStorage.getItem('chatTitle')? localStorage.getItem('chatTitle') : 'Chat 1');
  const [leavingMessage, setLeavingMessage] = useState('');

  useEffect(() => {
    try {
      async function fetchTickets() {
        const response = await getTicketsById(user.id, token);
        if (!response.ok) {
          return
          // return toast.error("Failed to fetch events. Please try again.");
        }
        const data = await response.json();
        const ticketsFromServer = data.tickets;
        const unresolvedTickets = ticketsFromServer.filter(ticket => ticket.status === 'unresolved');
        // console.log(ticketsFromServer);
        // console.log(unresolvedTickets);
        setTickets(unresolvedTickets);
      }

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [selectedTicketId, setSelectedTicketId] = useState(() => {
    const storedId = localStorage.getItem('selectedTicketId');
    if (storedId) {
      console.log("StoredId: ", storedId);
      return storedId;
    } else if (tickets.length > 0) {
      return tickets[0]._id;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (!selectedTicketId) return;
    localStorage.setItem('selectedTicketId', selectedTicketId)
  }, [selectedTicketId]);

  useEffect(() => {
    localStorage.setItem('chatTitle', [chatTitle]);
  }, [chatTitle]);

  useEffect(() => {
    if (tickets.length > 0 || !selectedTicketId) {
      console.log(tickets);
      setSelectedTicketId(tickets[0]?._id);
    }
  }, [tickets]);

  useEffect(() => {
    if (leavingMessage) {
      localStorage.removeItem('selectedTicketId');
    }
  }, [leavingMessage])

  

  useEffect(() => console.log("Tickets: ", tickets), [tickets]);
  useEffect(() => console.log('selcted ticket: ', selectedTicketId), [selectedTicketId]);
  // useEffect(() => console.log("Selected chats: ", chatMessages), [chatMessages]);

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.main}>
        <ChatsComponent
          tickets={tickets}
          selectedTicketId={selectedTicketId}
          setSelectedTicketId={setSelectedTicketId}
          setChatTitle={setChatTitle}
          leavingMessage={leavingMessage}
        />
        <ChatViewer tickets={tickets} selectedTicketId={selectedTicketId} chatTitle={chatTitle} leavingMessage={leavingMessage} />
        <ChatDetails tickets={tickets} selectedTicketId={selectedTicketId} setTickets={setTickets} setLeavingMessage={setLeavingMessage} />
      </div>
    </div>
  )
}

export default ContactCenter
