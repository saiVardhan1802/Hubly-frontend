import React from 'react';
import styles from './styles/Messages.module.css';
import teamProfileImg from '../../../assets/global/teamProfileImg.svg';

const Messages = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        message.senderType==='visitor'?
        <div key={index} className={styles.right}>
            <p>{message.content}</p>
        </div>
        :
        <div key={index} className={styles.left}>
            {index === 0 || messages[index - 1].senderType!=='team' ? 
                <img src={teamProfileImg} alt='team profile' />
                :
                <div className={styles.emptyLeft}></div>
            }
            <div className={styles.messageText}>
                <p>{message.content}</p>
            </div>
        </div>
      ))}
    </>
  )
}

export default Messages
