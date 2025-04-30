import React, { useEffect, useState } from 'react';
import styles from './styles/ModalComponent.module.css';
import { moveTicket, updateTicketStatus } from '../../../services';
import toast from 'react-hot-toast';

const ModalComponent = ({ type, setIsModal, differentTeamId, teams, ticketId, setTickets, differentUserId, setLeavingMessage }) => {
    const token = localStorage.getItem('token');
    const [localTeams, setLocalTeams] = useState([]);
    const [localTicketId, setLocalTicketId] = useState('');
    const [localDifferentTeamId, setLocalDifferentTeamId] = useState('');

    useEffect(() => {
        setLocalTeams(teams);
        setLocalTicketId(ticketId);
        setLocalDifferentTeamId(differentTeamId);
    }, [teams, ticketId, differentTeamId]);

    let title = '';
    switch (type) {
        case 'ticket':
            title = 'Chat will be closed';
            break;
        case 'teams':
            title = 'Chat would be assigned to Different team';
            break;
        case 'members':
            title = 'Chat would be assigned to Different team member';
            break;
        default:
            title = '';
    }

    async function assignTicketToTeam() {
        console.log(teams);
        const team = Object.values(teams).filter(team => team.teamId === differentTeamId);
        console.log(team);
        console.log(differentTeamId);
        const users = team[0].users;
        const admin = users.filter(user => user.role === 'admin')[0];
        console.log(admin._id);
        console.log(typeof ticketId);
    
        try {
            const response = await moveTicket(admin._id, ticketId, token);
            if (!response.ok) {
                toast.error("Failed to assign ticket. Please try again.");
            } else {
                toast.success("Ticket has been successfully assigned.");
                // setTickets(prevTicket => prevTicket.filter((ticket) => ticket._id !== ticketId));
            }
        } catch (error) {
            console.error(error);
        }
    }    

    async function handleClick() {
        switch (type) {
            case 'ticket':
                try {
                    const response = await updateTicketStatus(ticketId, token, 'resolved');
                    if (!response.ok) return toast.error('Failed to update ticket status. Please try again.');
                    // setTickets(prevTicket => prevTicket.filter((ticket) => ticket._id !== ticketId));
                    setLeavingMessage('This chat has been resolved ');
                    toast.success("Ticket status has been successfully updated.");
                } catch (error) {
                    console.log(error);
                }
                break;
            case 'teams':
                console.log(teams)
                const team = Object.values(teams).filter(team => team.teamId === differentTeamId);
                console.log(team);
                console.log(differentTeamId); //why did this work?
                const users = team[0].users;
                const admin = users.filter(user => user.role === 'admin')[0];
                console.log(admin._id);
                console.log(typeof ticketId);
                try {
                    const response = await moveTicket(admin._id, ticketId, token); 
                    if (!response.ok) {
                        toast.error("Failed to assign ticket. Please try again.");
                    }
                    else {
                        toast.success("Ticket has been successfully assigned.");
                        // setTickets(prevTicket => prevTicket.filter((ticket) => ticket._id !== ticketId));
                        setLeavingMessage('This chat is assigned to new team. you no longer have access ')
                    }
                } catch (error) {
                    console.error(error);
                };
                break;
            case 'members':
                try {
                    console.log(differentUserId); //undefined //and why is this not working?
                    const response = await moveTicket(differentUserId, ticketId, token); 
                    if (!response.ok) {
                        toast.error("Failed to assign ticket. Please try again.");
                    } else {
                        toast.success("Ticket has been successfully assigned.");
                        setIsModal(false);
                        // setTickets(prevTicket => prevTicket.filter((ticket) => ticket._id !== ticketId));
                        setLeavingMessage('This chat is assigned to new team member. you no longer have access')
                    }
                } catch (error) {
                    console.error(error);
                };
                break;
            default:
                title = '';
        }
    }
    return (
        <div className={styles.backDrop}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <div className={styles.buttonsContainer}>
                    <button style={{ color: '#AFAFAF' }} onClick={() => setIsModal(false)}>
                        <p>Cancel</p>
                    </button>
                    <button onClick={handleClick} style={{
                        color: 'white',
                        backgroundColor: '#184E7F'
                    }}>
                        <p>Confirm</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent
