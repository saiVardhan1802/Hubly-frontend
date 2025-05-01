import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import NavBar from '../../components/NavBar';
import searchIcon from '../../assets/dashboard/searchIcon.svg';
import ticketImg from '../../assets/dashboard/ticketImg.svg';
import { getTicketsById } from '../../services';
import { UserContext } from '../../services/Context/UserContext';
import TicketComponent from './components/TicketComponent';

const Dashboard = () => {
    const [searchedTicket, setSearchedTicket] = useState("");
    const [selectedTicketNav, setSelectedTicketNav] = useState("All Tickets");
    const ticketNav = ["All Tickets", "Resolved", "Unresolved"];
    const [tickets, setTickets] = useState([]);
    const user = useContext(UserContext);
    const token = localStorage.getItem('token');
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        try {
            async function fetchTickets() {
                const response = await getTicketsById(user.id, token);
                if (!response.ok) {
                    return //toast.error("Failed to fetch events. Please try again.");
                }
                const data = await response.json();
                const ticketsFromServer = data.tickets;
                setTickets(ticketsFromServer);
            }

            fetchTickets();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (searchedTicket) { setSelectedTicketNav("All Tickets") };
        const delay = setTimeout(() => {
            const filtered = tickets.filter(ticket =>
                ticket.title.toLowerCase().includes(searchedTicket.trim().toLowerCase())
            );
            setFilteredTickets(filtered);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchedTicket]);

    useEffect(() => console.log(tickets), [tickets]);

    return (
        <div className={styles.page}>
            <NavBar />
            <div className={styles.main}>
                <h1>Dashboard</h1>
                <div className={styles.inputContainer}>
                    <img src={searchIcon} alt="search icon" />
                    <input type="text"
                        placeholder='Search for ticket'
                        value={searchedTicket}
                        onChange={(e) => setSearchedTicket(e.target.value)}
                    />
                </div>
                <div className={styles.parent}>
                    <div className={styles.ticketNav}>
                        {ticketNav.map((nav, index) => (
                            <div key={index} className={`${selectedTicketNav === nav ? styles.selectedNav : ""}`}>
                                <button type='button'
                                    className={`${nav === "All Tickets" ? styles.allTicketsBtn : ""} `}
                                    style={{
                                        color: selectedTicketNav === nav ? '#184E7F' : '#888888'
                                    }}
                                    onClick={() => setSelectedTicketNav(nav)}
                                >
                                    <img src={ticketImg} alt="Ticket icon" style={{
                                        display: nav !== 'All Tickets' && 'none',
                                    }}
                                    />
                                    <p>{nav}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.ticketsContainer}>
                        {searchedTicket ? filteredTickets.map((ticket, index) => (
                            <TicketComponent ticket={ticket} />
                        ))
                            :
                            selectedTicketNav === 'All Tickets' ?
                                tickets.map((ticket, index) => (
                                    <TicketComponent ticket={ticket} />
                                ))
                                :
                                tickets.filter((ticket) => ticket.status === selectedTicketNav.toLowerCase()).map((ticket, index) => (
                                    <div key={index}>
                                        <TicketComponent ticket={ticket} />
                                    </div>
                                ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard
