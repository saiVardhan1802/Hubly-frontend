import React, { useEffect, useState } from 'react';
import styles from './styles/WelcomeMessageDisplay.module.css'
import { useCustomization } from '../../../services/Context/ChatBotCustomization';
import teamProfileImg from '../../../assets/global/teamProfileImg.svg'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { getCustomization } from '../../../services';
import { TfiClose } from "react-icons/tfi";

const WelcomeMessageDisplay = ({ containerStyles }) => {
    const location = useLocation();
    const [customization, setCustomization] = useState();
    const initialCustomization = useCustomization();
    const [isClosed, setIsClosed] = useState(false);

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
    }, [location.pathname, initialCustomization])

    // useEffect(async () => {
    //     try {
    //         const response = await fetchCustomization();
    //         console.log(response.body);
    //         const data = response.json();
    //         console.log(data);
    //         setCustomization(data);
    //     } catch (error) {
    //         toast.error('something went wrong');
    //     }
    // }, [])
    // const customization = useCustomization(); this is working when I comment out everything above
    return (
        <div style={{...containerStyles,
            display: isClosed && 'none'
        }} className={styles.container}>
            <img src={teamProfileImg} alt="team profile" className={styles.teamProfileImg} />
            <div className={styles.messageWrapper}>
                <p>{customization?.welcomeMessage}</p>
            </div>
            <button onClick={() => setIsClosed(true)} type='button'>
                <TfiClose />
            </button>
        </div>
    )
}

export default WelcomeMessageDisplay
