import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ACTIONS, useCustomization, useCustomizationDispatch, useTimer } from '../../../services/Context/ChatBotCustomization';
import styles from './styles/TimePicker.module.css';
import { createCustomization, updateCustomization } from '../../../services';
import toast from 'react-hot-toast';

const TimePicker = () => {
    const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();
    const token = localStorage.getItem('token');

    // const initialTimer = useRef(customization?.timer || { hours: 1, minutes: 0, seconds: 0 });
    // const [timer, setTimer] = useState(initialTimer.current);
    // const timer = useMemo(() => customization?.timer, [JSON.stringify(customization?.timer)]);
    const timer = useTimer();


    const hoursRef = useRef(null);
    const minsRef = useRef(null);
    const secsRef = useRef(null);

    useEffect(() => {
        if (hoursRef.current) {
            scrollToCenter(hoursRef.current, timer.hours);
        }
        if (minsRef.current) {
            scrollToCenter(minsRef.current, timer.minutes);
        }
        if (secsRef.current) {
            scrollToCenter(secsRef.current, timer.seconds);
        }
    }, [timer]);

    // useEffect(() => {
    //     dispatchCustomization({ type: ACTIONS.SET_TIMER, payload: timer })
    // }, [timer])

    function handleClick() {
        const cols = [
            { key: 'hours', ref: hoursRef },
            { key: 'minutes', ref: minsRef },
            { key: 'seconds', ref: secsRef }
        ];

        const newTime = {}

        cols.forEach(({ key, ref }) => {
            const container = ref.current;
            const blocks = container.querySelectorAll('.timeBlock');
            const containerRect = container.getBoundingClientRect();

            let closest = null;
            let minDistance = Infinity;

            blocks.forEach((block) => {
                const blockRect = block.getBoundingClientRect();
                const distance = Math.abs(
                    (blockRect.top + blockRect.height / 2) - (containerRect.top + containerRect.height / 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    const value = parseInt(block.textContent);
                    if (!isNaN(value)) {
                        closest = value;
                    }
                }
            })
            newTime[key] = closest;
        })
        // setTimer(newTime);
        console.log("newTime :", newTime);
        dispatchCustomization({ type: ACTIONS.SET_TIMER, payload: newTime });
    };

    async function submitCustomization() {
        try {
            console.log(customization);  //does log the customization which I can see is not empty
            let response;
            if (customization._id) {
                response = await updateCustomization(customization._id, token, customization)
            }
            else {
                response = await createCustomization(token, customization);
            }
            if (!response.ok) {
                // console.log(response.body);
                toast.error("Something went wrong. Please try again.");
                return;
            }
            toast.success("Customization successfully saved.")
        } catch (error) {
            console.error(error);
        }
    }

    const [readyToSubmit, setReadyToSubmit] = useState(false);

    useEffect(() => {
        if (readyToSubmit) {
            submitCustomization();
            setReadyToSubmit(false); // reset
        }
    }, [customization.timer]);

    async function handleSubmit(e) {
        // e.preventDefault();
        handleClick();
        setReadyToSubmit(true);
    }

    useEffect(() => {
        console.log(timer);
    }, [timer]);

    return (
        <div className={styles.container}>
            <h3>Missed chat timer</h3>
            <div className={styles.timeContainer}>
                <div ref={hoursRef} className={styles.column}>
                    {returnList(13)}
                </div>
                <p>:</p>
                <div ref={minsRef} className={styles.column}>
                    {returnList(60)}
                </div>
                <p>:</p>
                <div ref={secsRef} className={styles.column}>
                    {returnList(60)}
                </div>
            </div>
            <button type='button' onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default TimePicker;

function generateList(max) {
    const list = Array.from({ length: max }, (_, i) => i.toString().padStart(2, '0'));
    list.push('');
    list.unshift('');
    return list;
}

function returnList(max) {
    return generateList(max).map((item, i) => (
        <div className='timeBlock' key={i}>{item}</div>
    ))
}

// function scrollToCenter(container, selectedItem) {
//     if (!container) return;
//     const items = container.querySelectorAll('.timeBlock');
//     const selected = Array.from(items).find(item => item.textContent === selectedItem.toString().padStart(2, '0'));
//     if (selected) {
//         selected.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
//     }
// }

function scrollToCenter(container, selectedItem) {
    const items = Array.from(container.querySelectorAll('.timeBlock'));
    const index = items.findIndex(item => item.textContent === selectedItem.toString().padStart(2, '0'));

    if (index !== -1) {
        const itemHeight = items[0].offsetHeight;
        const offset = (index * itemHeight) - (container.clientHeight / 2) + (itemHeight / 2);
        container.scrollTop = offset;
    }
}

