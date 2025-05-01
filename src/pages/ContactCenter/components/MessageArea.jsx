import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles/MessageArea.module.css';
import imageOne from '../../../assets/team/imageOne.svg';
import imageTwo from '../../../assets/team/imageTwo.svg';
import imageThree from '../../../assets/team/imageThree.svg';
import imageFour from '../../../assets/team/imageFour.svg';
import { pickRandomImage } from '../../Team';
import { UserContext } from '../../../services/Context/UserContext';
import { useCustomization } from '../../../services/Context/ChatBotCustomization';

const MessageArea = ({ messages, chatTitle, ticket }) => {
    const images = [imageOne, imageFour, imageThree, imageTwo];
    const containerRef = useRef(null);
    const user = useContext(UserContext);
    const customization = useCustomization();
    const [localCustomization, setLocalCustomization] = useState({});
    const [localTicket, setLocalTicket] = useState({});

    useEffect(() => {
        setLocalCustomization(customization);
    }, [customization]);

    useEffect(() => {
        setLocalTicket(ticket);
    }, [ticket])

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight; // auto-scroll to bottom on new messages
        }
    }, [messages]);

    useEffect(() => console.log(localCustomization), [localCustomization]);
    useEffect(() => console.log(localTicket), [localTicket])

    useEffect(() => console.log(chatTitle), [chatTitle]);
    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.wrapper}>
                {messages.map((message, index) => {
                    // Extract current message date
                    const currentDate = new Date(message.createdAt).toDateString();
                    // Extract previous message date
                    const prevDate = index > 0 ? new Date(messages[index - 1].createdAt).toDateString() : null;
                    const showDateDivider = currentDate !== prevDate;
                    return (
                        <div key={message._id}>
                            {showDateDivider && (
                                <div className={styles.dateDivider}>
                                    <hr />
                                    <p>{currentDate}</p>
                                    <hr />
                                </div>
                            )}
                            <div className={`${styles.chatBox} ${message.senderType === 'team' ? styles.team : styles.visitor}`}>
                                <img src={pickRandomImage(images)} alt="" />
                                <div>
                                    <p className={styles.chatTitle}>{message.senderType === 'team' ? `${user.firstName} ${user.lastName}` : chatTitle}</p>
                                    <p className={styles.messageText}>{message.content}</p>
                                </div>
                            </div>
                            {(index===0 && isMissedChat(localTicket?.createdAt, localCustomization?.timer)) && <p style={{
                                textAlign: 'center',
                                color: 'red',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}>Replying to a missed chat</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

function isMissedChat(createdAt, timer) {
    console.log(createdAt);
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffInMs = now - createdDate;

    const timerInMs =
        (timer?.hours || 0) * 60 * 60 * 1000 +
        (timer?.minutes || 0) * 60 * 1000 +
        (timer?.seconds || 0) * 1000;

    return diffInMs > timerInMs;
}

export default MessageArea
