import React, { useEffect, useState } from 'react';
import styles from './styles/TicketComponent.module.css';
import { formatCreatedAt } from '../../ContactCenter/components/ChatViewer';
import { getVisitor } from '../../../services';
import toast from 'react-hot-toast';
import imageOne from '../../../assets/contact-center/imageOne.svg';
import { useNavigate } from 'react-router-dom';

const TicketComponent = ({ ticket }) => {
    const [visitorData, setVisitorData] = useState({});
    const token = useState('token');
    const navigate = useNavigate();

    useState(() => {
        try {
            async function fetchVisitorData() {
                const response = await getVisitor(ticket?.visitorId, token);
                if (!response.ok) return //toast.error("Failed to fetch ticket. Please try again.");
                const data = await response.json();
                const visitorFromApi = data.visitor;
                setVisitorData(visitorFromApi);
            }
            fetchVisitorData();
        } catch (error) {
            console.error(error);
        }
    }, [ticket]);

    function handleClick(ticketId) {
        localStorage.setItem('selectedTicketId', ticketId);
        navigate('/contact-center');
    }

    useEffect(() => console.log(visitorData), [visitorData]);

    return (
        <div className={styles.parentContainer}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.circle}
                        style={{ backgroundColor: ticket.status === 'unresolved' ? '#F8A534' : '#02B994' }}>
                    </div>
                    <h3>{formatCreatedAt(ticket.createdAt)}</h3>
                </div>
                <div className={styles.title}>
                    <h2>{ticket.title}</h2>
                    <p>{getHourDifference(ticket.createdAt)}</p>
                </div>
                <hr style={{ marginTop: '2.5em' }} />
                <div className={styles.footer}>
                    <div className={styles.visitorData}>
                        <img src={imageOne} alt={`visitor ${visitorData?.name}`} />
                        <div >
                            <p style={{ fontSize: '1.2rem' }}>{visitorData?.name}</p>
                            <p style={{ fontSize: '0.9rem' }}>{visitorData?.phone}</p>
                            <p style={{ fontSize: '0.9rem' }}>{visitorData?.email}</p>
                        </div>
                    </div>
                    {ticket.status === 'unresolved' &&
                        <button onClick={() => handleClick(ticket._id)} style={{ marginRight: '1em'}} type='button'>
                            <p style={{ color: '#184E7F', textDecoration: 'underline', fontWeight: '600' }}>Open Ticket</p>
                        </button>
                    }
                </div>
                <p style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    fontSize: '0.75rem',
                    color: '#84818A',
                    fontFamily: '"Montserrat", sans-serif'
                }}>{getTicketPostedTime(ticket.createdAt)}</p>
            </div>
        </div>
    )
};

function getHourDifference(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffInMs = now - createdDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    const paddedHours = String(diffInHours).padStart(2, '0');
    return `${paddedHours}:00`;
}

function getTicketPostedTime(createdAt) {
    const date = new Date(createdAt);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes} ${ampm}`;
  
    return `Posted on ${day}-${month}-${year} at ${formattedTime}`;
}

export default TicketComponent
