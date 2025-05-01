import React, { useEffect, useState } from 'react';
import styles from './styles/ChatViewer.module.css';
import MessageArea from './MessageArea';
import TextAreaComponent from './TextAreaComponent';
import { getMessages, getMessagesByTicketId } from '../../../services';
import { GoHome } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import ChatbotComponent from '../../ChatBot/components/ChatbotComponent';
import ChatBotCustomizationProvider from '../../../services/Context/ChatBotCustomization';

const ChatViewer = ({ tickets, selectedTicketId, chatTitle, leavingMessage }) => {
  const [selectedTicket, setSelectedTicket] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (tickets.length === 0 || !selectedTicketId) return;
    const ticket = tickets.filter(ticket => ticket._id === selectedTicketId)[0];
    setSelectedTicket(ticket);
  }, [tickets, selectedTicketId]);

  useEffect(() => {
    if (!selectedTicketId || tickets.length === 0) return;

    const selectedTicket = tickets.find(ticket => ticket._id === selectedTicketId);

    if (!selectedTicket) return;

    console.log(selectedTicket);

    async function fetchMessages() {
      try {
        const response = await getMessagesByTicketId(selectedTicketId, token);
        if (!response.ok) return toast.error('Failed to fetch messages. Please try again.');
        const data = await response.json();
        const messagesFromApi = data.messages;
        console.log(messagesFromApi);
        setChatMessages(messagesFromApi);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();
  }, [selectedTicketId, tickets]);

  useEffect(() => {
    if (tickets.length < 0) {
      localStorage.removeItem('selectedTicketId');
    }
  }, [tickets])

  useEffect(() => console.log(selectedTicket), [selectedTicket]);
  useEffect(() => console.log(selectedTicketId), [selectedTicketId]);
  useEffect(() => console.log(chatMessages), [chatMessages]);

  return (
    // !tickets.length === 0 ?
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{formatCreatedAt(selectedTicket?.createdAt)}</h2>
        <button type='button' onClick={() => navigate('/dashboard')} style={{ marginRight: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GoHome style={{ color: '#86898C' }} />
        </button>
      </div>
      {!leavingMessage ?
        <ChatBotCustomizationProvider>
          <MessageArea ticket={selectedTicket} messages={chatMessages} chatTitle={chatTitle} />
        </ChatBotCustomizationProvider>
        :
        <div className={styles.leavingContainer}>
          <p>{formatCreatedAt(new Date())}</p>
        </div>
      }
      {!leavingMessage ?
        <TextAreaComponent ticket={selectedTicket} setMessages={setChatMessages} ticketId={selectedTicketId} visitorId={selectedTicket.visitorId} />
        :
        <div className={styles.leavingTextarea}>
          <p>{leavingMessage}</p>
        </div>
      }
    </div>
    // :
    // <div className={styles.empty}>
    //   <p>Nothing to show here.</p>
    // </div>
  )
}

export function formatCreatedAt(createdAt) {
  const date = new Date(createdAt); // convert string or date to Date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-based, so +1
  const day = date.getDate().toString().padStart(2, '0');

  return `Ticket# ${year}-0${month}${day}`;
}

export default ChatViewer
