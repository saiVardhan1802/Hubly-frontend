import React, { useEffect, useState } from 'react';
import styles from './styles/ChatbotComponent.module.css';
import teamProfileImg from '../../../assets/global/teamProfileImg.svg';
import { useCustomization } from '../../../services/Context/ChatBotCustomization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import IntroductionForm from './IntroductionForm';
import { useLocation } from 'react-router-dom';
import { createVisitor, getCustomization, getMessages, sendMessage } from '../../../services';
import toast from 'react-hot-toast';
import ChatsContainer from '../../../components/ChatsContainer';
import Messages from '../../Lander/components/Messages';

const ChatbotComponent = ({ additionalChatBotStyles, additionalChatContainerStyles }) => {
  const location = useLocation();
  const [customization, setCustomization] = useState();
  const initialCustomization = useCustomization();
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [visitorData, setVisitorData] = useState(() => {
    const storedData = localStorage.getItem('visitor');
    return storedData ? JSON.parse(storedData) : null;
  });


  useEffect(() => {
    if (location.pathname === '/') {
      const fetchCustomization = async () => {
        try {
          const response = await getCustomization();
          if (!response.ok) {
            toast.error('Something went wrong. Please try again.');
            return;
          }
          const data = await response.json();
          console.log(data);
          setCustomization(data);
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong. Please try again.');
        }
      };

      fetchCustomization();
    }
    else if (location.pathname === '/chat-bot') {
      setCustomization(initialCustomization);
    }
  }, [location.pathname, initialCustomization]);

  useEffect(() => {
    if (!visitorData) return;
    async function fetchMessages() {
      try {
        const response = await getMessages(visitorData.id);
        if (!response.ok) {
          return 
          // toast.error("Failed to fetch messages. Try again.")
        }
        const data = await response.json();
        const fetchedMessages = data.messages;
        setMessages(fetchedMessages);
      } catch (error) {
        console.error(error);
      }
    }
    if (visitorData) {
      fetchMessages();
    }
  }, [])

  async function handleMessageSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    if (!visitorData) {


      if (!text.trim()) return;

      // Normal message sending
      setMessages(prev => [
        ...prev,
        {
          content: text,
          date: new Date(),
          senderType: 'visitor'
        }
      ]);
      setText("");

      // After 1 second, show team messages
      setTimeout(() => {
        const customizedMessages = customization.initialMessages.map(msg => ({
          content: msg,
          senderType: 'team',
          date: new Date(),
          type: 'custom'
        }));
        setMessages(prev => [...prev, ...customizedMessages]);
        setDisplayForm(true);
      }, 1000);
    }
    else {
      const message = {
        content: text,
        senderType: 'visitor',
        ticketId: messages[messages.length - 1].ticketId,
        userId: messages[messages.length - 1].userId,
        visitorId: visitorData.id,
        createdAt: new Date(),
      }
      try {
        const response = await sendMessage(message);
        if (!response.ok) return toast.error("Failed to send the message. Please try again.");
      } catch (error) {
        console.error(error);
      }
      setMessages(prev => ([
        ...prev,
        message
      ]));
      setText('');
    }
  };

  async function handleVisitorSubmit(e) {
    e.preventDefault();

    if (!visitorData.name || !visitorData.email || !visitorData.phone) {
      return toast.error("All fields are required.");
    }
    if (!isValidEmail(visitorData.email)) {
      return toast.error("Please enter a valid email.");
    }
    if (!isValidPhoneNumber(visitorData.phone)) {
      return toast.error("Please enter a valid phone number.");
    }

    try {
      const response = await createVisitor(visitorData, messages);
      if (!response.ok) {
        toast.error("Failed to upload data. Please try again.");
        return;
      }
      const data = await response.json();

      // Save visitor
      localStorage.setItem('visitor', JSON.stringify(data.visitor));
      setVisitorData(data.visitor);
      setDisplayForm(false);

      toast.success("Thank you for choosing Hubly. We will get back to you.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => console.log(visitorData), [visitorData])
  useEffect(() => console.log(messages), [messages]);

  return (
    <div className={`${styles.container} ${additionalChatBotStyles}`}>
      <div style={{ backgroundColor: `#${customization?.headerColor}` }} className={styles.header}>
        <div className={styles.profileImg}>
          <img src={teamProfileImg} alt="team profile" />
        </div>
        <p>Hubly</p>
      </div>
      <div style={{ backgroundColor: `#${customization?.backgroundColor}` }} className={`${styles.chatContainer} ${additionalChatContainerStyles}`}>
        {location.pathname === '/chat-bot' ?
          <ChatsContainer />
          :
          <>
            <Messages messages={messages} />
            <form onSubmit={handleVisitorSubmit}>
              <IntroductionForm style={{
                boxShadow: 'none',
                width: '80%',
                fontSize: '0.9rem',
                // float: 'right',
                display: (!displayForm) ? 'none' : 'block',
                marginLeft: 'auto'
              }}
                title='Introduce Yourself'
                customization={customization}
                visitorData={visitorData}
                setVisitorData={setVisitorData}
              />
            </form>
          </>
        }
      </div>
      <form onSubmit={handleMessageSubmit}>
        <div className={styles.textareaWrapper}
          style={{
            pointerEvents: displayForm && 'none'
          }}>
          <textarea
            placeholder='Write a message'
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}></textarea>
          <button type='submit' className={styles.sendButton}>
            <FontAwesomeIcon className={styles.sendIcon} color='#B0C1D4' icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  )
}

function insertAtIndex(arr, index, value) {
  arr.splice(index, 0, value);
}

export function isValidPhoneNumber(phone) {
  // const phoneRegex = /^[6-9]\d{9}$/;
  const phoneRegex = /“^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$”/;
  return phoneRegex.test(phone);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default ChatbotComponent
