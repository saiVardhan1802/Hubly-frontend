import React from 'react';
import styles from './styles/ChatsContainer.module.css';
import { useCustomization } from '../services/Context/ChatBotCustomization';
import IntroductionForm from '../pages/ChatBot/components/IntroductionForm';
import teamProfileImg from '../assets/global/teamProfileImg.svg';

const ChatsContainer = () => {
    const customization = useCustomization();
    return (
        <>
            {customization?.initialMessages.map((msg, index) => (
                <div className={styles.chatBox} key={index}>
                    <img src={teamProfileImg} alt="team profile" style={{ display: index === 1 && 'none' }} />
                    <div className={styles.chatText}>
                        <p>{msg}</p>
                    </div>
                </div>
            ))}
            < div >
                <form>
                    <IntroductionForm style={{
                        boxShadow: 'none',
                        width: '80%',
                        fontSize: '0.9rem',
                        float: 'right'
                    }}
                        title='Introduce Yourself'
                        customization={customization}
                    />
                </form>
            </div >
        </>
    )
}

export default ChatsContainer
