import React, { useState } from 'react'
import styles from '../styles/Lander.module.css';
import WelcomeMessageDisplay from '../ChatBot/components/WelcomeMessageDisplay';
import ChatbotIcon from '../../assets/lander/ChatbotIcon.svg';
import crossIcon from '../../assets/lander/crossIcon.svg';
import ChatbotComponent from '../ChatBot/components/ChatbotComponent';

const Lander = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(true);
    return (
        <div className={styles.page}>
            <div className={styles.main}></div>
            <div className={styles.chatbot}>
                {!isChatbotOpen ? <WelcomeMessageDisplay containerStyles={{
                    width: 'clamp(250px, 10vw, 800px)'
                }} /> 
                : 
                <ChatbotComponent
                    additionalChatBotStyles={styles.landerChatbotStyles}
                    additionalChatContainerStyles={styles.chatContainer}
                    // containerStyles={{
                    //     width: 'clamp(200px, 25vw, 500px)'
                    // }}
                />}
                <button type='button' onClick={() => setIsChatbotOpen((prev) => !prev)} className={styles.chatbotButton}>
                    <img src={!isChatbotOpen? ChatbotIcon : crossIcon} alt="chatbot icon" />
                </button>
            </div>
        </div>
    )
}

export default Lander
