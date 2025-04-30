import React, { useContext, useEffect, useState } from 'react'
import styles from './styles/TextAreaComponent.module.css';
import { IoSendSharp } from "react-icons/io5";
import { data } from 'react-router-dom';
import { UserContext } from '../../../services/Context/UserContext';
import { sendMessage } from '../../../services';
import toast from 'react-hot-toast';

const TextAreaComponent = ({ setMessages, ticketId, visitorId }) => {
  const [text, setText] = useState('');
  const user = useContext(UserContext);

  // useEffect(() => console.log(messages))

  async function handleClick(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const message = {
      content: text,
      senderType: 'team',
      ticketId,
      userId: user.id,
      visitorId,
      createdAt: new Date(),
    }
    try {
      const response = await sendMessage(message);
      if (!response.ok) return toast.error('Failed to send the message. Please try again.');
    } catch (error) {
      console.error(error);
    }
    setMessages(prev => ([
      ...prev,
      message
    ]));
    setText('');
  }
  return (
    <div className={styles.container}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='type here...'
      ></textarea>
      <button type='button' onClick={(e) => handleClick(e)} style={{
        border: text.trim() ? '1.5px solid #184E7F' : '1.5px solid #D1D6DA',
        color: text.trim() ? '#184E7F' : '#D1D6DA',
      }}>
        <IoSendSharp className={styles.sendIcon} />
      </button>
    </div>
  )
};

function getDateInISO() {
  const date = new Date();
  return date.toISOString;
}

export default TextAreaComponent
