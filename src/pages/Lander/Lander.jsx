import React, { useState } from 'react'
import styles from '../styles/Lander.module.css';
import WelcomeMessageDisplay from '../ChatBot/components/WelcomeMessageDisplay';
import ChatbotIcon from '../../assets/lander/ChatbotIcon.svg';
import crossIcon from '../../assets/lander/crossIcon.svg';
import ChatbotComponent from '../ChatBot/components/ChatbotComponent';
import Nav from './components/Nav';
import HeroLeft from './components/HeroLeft';
import HeroRight from './components/HeroRight';
import Companies from './components/Companies';
import combined from '../../assets/lander/combined.png'
import Funnel from './components/Funnel';
import SubscriptionComponent from './components/SubscriptionComponent';

const Lander = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const starter = [
        "Unlimited Users",
        "GMB Messaging",
        "Reputation Management",
        "GMB Call Tracking",
        "24/7 Award Winning Support"
      ]
    const grow = [
        "Pipeline Management",
        "Marketing Automation Campaigns",
        "Live Call Transfer",
        "GMB Messaging",
        "Embed-able Form Builder",
        "Reputation Management",
        "24/7 Award Winning Support"
      ]
            
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <Nav />
                <div className={styles.hero}>
                    <HeroLeft />
                    <HeroRight />
                </div>
                {/* <Companies /> */}
                <img src={combined} alt="" style={{
                    marginTop: '20%'
                }} />
                <div style={{
                    width: '50%',
                    margin: '3em auto 2em auto',
                    fontFamily: "'Barlow', sans-serif",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1em'
                }}>
                    <h3 style={{
                        color: '#30404D',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        width: '60%',
                        textAlign: 'center'
                    }}>At its core, Hubly is a robust CRM solution.</h3>
                    <p style={{
                        textAlign: 'center',
                        color: "#30404D"
                    }}>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</p>
                </div>
                <div className={styles.middle}>
                    <div className={styles.platformWrapper}>
                        <div className={styles.platforms}>
                            <h3 style={{ color: '#30404D' }}>MULTIPLE PLATFORMS TOGETHER!</h3>
                            <p style={{ color: '#394B59' }}>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                        </div>
                        <div className={styles.close}>
                            <p style={{ color: '#30404D', fontWeight: '700', marginTop: '2em' }}>CLOSE</p>
                            <p style={{ color: '#394B59' }}>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                        </div>
                        <div className={styles.nurture}>
                            <p style={{ color: '#30404D', fontWeight: '700', marginTop: '1em' }}>NURTURE</p>
                            <p style={{ color: '#394B59' }}>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                        </div>
                    </div>
                    <Funnel />
                </div>
                <div style={{ alignSelf: 'center', width: '50%', textAlign: 'center', margin: '4em 0', color: '#30404D' }}>
                    <h4 style={{ fontSize: '2rem' }}>We have plans for everyone!</h4>
                    <p style={{ marginTop: '2em' }}>We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform.</p>
                </div>
                <div className={styles.planContainer}>
                    <SubscriptionComponent 
                        title="STARTER" 
                        description='Best for local businesses needing to improve their online reputation.' 
                        price='$199'
                        listItems={starter}
                    />
                    <SubscriptionComponent 
                        title="GROW" 
                        description='Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.' 
                        price='$399'
                        listItems={grow}
                    />
                </div>
            </div>
            <div className={styles.chatbot}>
                {!isChatbotOpen ? <WelcomeMessageDisplay containerStyles={{
                    width: 'clamp(250px, 10vw, 800px)',
                    display: 'none'
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
