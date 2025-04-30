import React from 'react';
import styles from './styles/CustomizeMessage.module.css';
import { ACTIONS, useCustomization, useCustomizationDispatch } from '../../../services/Context/ChatBotCustomization';
import { MdEdit } from 'react-icons/md';

const CustomizeMessage = () => {
    const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();

    function handleChange(e, index) {
        dispatchCustomization({ type: ACTIONS.SET_INITIAL_MESSAGES, payload: { index, value: e.target.value }})
        return;
    }
    return (
        <div className={styles.container}>
            <h3>Customize Message</h3>
            <div className={styles.inputContainer}>
                <div>
                    <input type="text" 
                        value={customization.initialMessages[0]} 
                        onChange={(e) => handleChange(e, 0)}
                    />
                    <MdEdit className={styles.editIcon} />
                </div>
                <div>
                    <input type="text"
                        value={customization.initialMessages[1]} 
                        onChange={(e) => handleChange(e, 1)}
                    />
                    <MdEdit className={styles.editIcon} />
                </div>
            </div>
        </div>
    )
}

export default CustomizeMessage
