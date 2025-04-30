import React from 'react';
import NavBar from '../../components/NavBar';
import styles from '../styles/ChatBot.module.css';
import { useCustomizationDispatch, useCustomization } from '../../services/Context/ChatBotCustomization';
import ColorPicker from './components/ColorPicker';
import CustomizeMessage from './components/CustomizeMessage';
import IntroductionForm from './components/IntroductionForm';
import WelcomeMessage from './components/WelcomeMessage';
import TimePicker from './components/TimePicker';
import ChatbotComponent from './components/ChatbotComponent';
import WelcomeMessageDisplay from './components/WelcomeMessageDisplay';

const ChatBot = () => {
    const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();
  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.main}>
        <h1>Chat Bot</h1>
        <div className={styles.container}>
          <div className={styles.chatBotContainer}>
            <ChatbotComponent containerStyles={{
              pointerEvents: 'none'
            }} />
            <WelcomeMessageDisplay containerStyles={{
              pointerEvents : 'none'
            }} />
          </div>
          <div className={styles.customizationContainer}>
            <form>
              <ColorPicker title='Header Color' />
              <ColorPicker title='Custom Background Color' />
              <CustomizeMessage />
              <IntroductionForm title='Introduction Form' customization={customization} />
              <WelcomeMessage />
              <TimePicker />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
