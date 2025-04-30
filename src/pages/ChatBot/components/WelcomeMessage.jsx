import React, { useEffect, useRef } from 'react';
import styles from './styles/WelcomeMessage.module.css'
import { ACTIONS, useCustomization, useCustomizationDispatch } from '../../../services/Context/ChatBotCustomization';
import { MdEdit } from 'react-icons/md';

const WelcomeMessage = () => {
    const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();
    const textareaRef = useRef(null);

    const maxWordCount = 50;

    function handleChange(e) {
        const { value } = e.target;
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= maxWordCount) {
            dispatchCustomization({
                type: ACTIONS.SET_WELCOME_MESSAGE,
                payload: value,
            });
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current;

        function adjustHeight() {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        }

        adjustHeight();
        window.addEventListener('resize', adjustHeight);

        return () => window.removeEventListener('resize', adjustHeight);
    }, customization.welcomeMessage ? [customization.welcomeMessage] : []);

    return (
        <div className={styles.container}>
            <h3>Welcome Message</h3>
            <div className={styles.textareaWrapper}>
                <textarea
                    ref={textareaRef}
                    value={customization.welcomeMessage}
                    rows={2}
                    onChange={(e) => handleChange(e)}
                ></textarea>
                <span>{customization.welcomeMessage.trim().split(/\s+/).length}/{maxWordCount}</span>
                <MdEdit className={styles.editIcon} />
            </div>
        </div>
    )
}

export default WelcomeMessage
