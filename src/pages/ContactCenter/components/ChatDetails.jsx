import React, { useContext, useEffect, useState } from 'react';
import styles from './styles/ChatDetails.module.css';
import imageOne from '../../../assets/contact-center/imageOne.svg';
import imageTwo from '../../../assets/contact-center/imageTwo.svg';
import { pickRandomImage } from '../../Team';
import { getVisitor } from '../../../services';
import toast from 'react-hot-toast';
import nameIcon from '../../../assets/contact-center/nameIcon.svg';
import phoneIcon from '../../../assets/contact-center/phoneIcon.svg';
import mailIcon from '../../../assets/contact-center/mailIcon.svg';
import { UserContext } from '../../../services/Context/UserContext';
import { useTeams } from '../../../services/Context/TeamsContext';
import { AiOutlineTeam } from "react-icons/ai";
import ticketIcon from '../../../assets/contact-center/ticketIcon.svg';
import ModalComponent from './ModalComponent';

const ChatDetails = ({ tickets, selectedTicketId, setTickets, setLeavingMessage }) => {
  const images = [imageOne, imageTwo];
  const [visitor, setVisitor] = useState({});
  const token = localStorage.getItem('token');
  const user = useContext(UserContext);
  const teams = useTeams();
  const [currentUserTeam, setCurrentUserTeam] = useState([]);
  const [openTeams, setOpenTeams] = useState(false);
  const [openTeamMembers, setOpenTeamMembers] = useState(false);
  const [clickedTicketStatus, setClickedTicketStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [differentTeamId, setDifferentTeamId] = useState('');
  const [differentUserId, setDifferentUserId] = useState('');
  const [selectedTicket, setSelectedTicket] = useState({});

  useEffect(() => {
    if (tickets.length === 0 || !selectedTicketId) return;
    const ticket = tickets.filter(ticket => ticket._id === selectedTicketId)[0];
    setSelectedTicket(ticket);
  }, [tickets, selectedTicketId]);


  console.log("teams in chat details", teams);
  console.log("current user", user);
  // console.log("current user team", currentUserTeam);

  const visitorIcons = [nameIcon, phoneIcon, mailIcon];
  const visitorKeys = ['name', 'phone', 'email'];

  useEffect(() => {
    if (tickets.length === 0 || !selectedTicketId) return;
    try {
      const selectedTicket = tickets?.filter(ticket => ticket._id === selectedTicketId)[0];
      if (!selectedTicket) return;
      async function fetchVisitor() {
        const response = await getVisitor(selectedTicket?.visitorId, token);
        if (!response.ok) return //toast.error("Failed to fetch visitor data. Please try again.");
        const data = await response.json();
        const visitorFromApi = data.visitor;
        setVisitor(visitorFromApi);
      }

      fetchVisitor();
    } catch (error) {
      console.error(error);
    }
  }, [selectedTicketId, tickets]);

  useEffect(() => {
    if (teams.length === 0) return;
    setCurrentUserTeam(findTeamById(user, teams));
  }, [user, teams])

  useEffect(() => console.log("SelectedVisitor: ", visitor), [visitor]);
  useEffect(() => console.log("current user team", currentUserTeam), [currentUserTeam]);

  return (
    // (!tickets.length === 0) ?
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={pickRandomImage(images)} alt="Chat profile" />
        <p>Chat</p>
      </div>
      <h2>Details</h2>
      {visitorKeys.map((key, index) => (
        <div key={index} className={styles.box}>
          <img src={visitorIcons[index]} alt="icon" />
          <p>{visitor[key]}</p>
        </div>
      ))}

      {/* Teams */}
      {user.role === 'super-admin' && selectedTicket.status === 'unresolved' && (
        <>
          <h2 style={{ marginTop: '1em' }}>Teams</h2>
          <button
            className={`${styles.box} ${styles.dropBox}`}
            type='button'
            onClick={() => setOpenTeams(prev => !prev)}
          >
            <AiOutlineTeam className={styles.icon} />
            <p>{currentUserTeam?.teamName}</p>
          </button>
        </>
      )}
      {openTeams &&
        <div className={`${styles.box} ${styles.selectionContainer}`}>
          {Object.values(teams)?.map((team, index) => (
            <button key={index} onClick={() => {
              setModalType('teams');
              setIsModalOpen(true);
              setDifferentTeamId(team.teamId);
            }}>
              <AiOutlineTeam className={styles.icon} />
              <p>{team?.teamName}</p>
            </button>
          ))}
        </div>
      }

      {/* Team Members */}
      {(user.role === 'admin' || user.role === 'super-admin') && selectedTicket.status === 'unresolved' && (
        <>
          <h2 style={{ marginTop: '1em' }}>Team Members</h2>
          <button
            className={`${styles.box} ${styles.dropBox}`}
            type='button'
            onClick={() => setOpenTeamMembers(prev => !prev)}
          >
            <AiOutlineTeam className={styles.icon} />
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
          </button>
        </>
      )}
      {openTeamMembers &&
        <div className={`${styles.box} ${styles.selectionContainer}`}>
          {currentUserTeam?.users.map((user, index) => (
            <button key={index} onClick={() => {
              setModalType('members')
              setIsModalOpen(true);
              setDifferentUserId(user._id);
            }}>
              <AiOutlineTeam className={styles.icon} />
              <p>{`${user?.firstName} ${user?.lastName}`}</p>
            </button>
          ))}
        </div>
      }

      {/* ticket status */}
      {selectedTicket.status === "unresolved" &&
        <button type='button'
          className={`${styles.box} ${styles.dropBox}`}
          onClick={() => setClickedTicketStatus(prev => !prev)}
        >
          <img src={ticketIcon} alt="Ticket icon" />
          <p>Ticket Status</p>
        </button>}
      {clickedTicketStatus &&
        <div className={`${styles.box} ${styles.selectionContainer}`}>
          <button type='button' onClick={() => {
            setModalType('ticket');
            setIsModalOpen(true);
          }}>
            <p>Resolved</p>
          </button>
          <button type='button' onClick={() => toast("Ticket set to unresolved")}>
            <p>Unresolved</p>
          </button>
        </div>
      }
      {isModalOpen &&
        <ModalComponent
          type={modalType}
          setIsModal={setIsModalOpen}
          differentTeamId={differentTeamId}
          teams={teams}
          ticketId={selectedTicketId}
          setTickets={setTickets}
          differentUserId={differentUserId}
          setLeavingMessage={setLeavingMessage}
        />
      }
    </div>
    // :
    // <div className={styles.empty}>
    //   <p>Nothing to show here.</p>
    // </div>

  )
}

function findTeamById(user, teams) {
  console.log(teams);
  const teamsArray = Array.from(Object.values(teams));
  const userTeam = teamsArray.filter((team) => team.teamId === user.team.teamId);
  return userTeam[0];
}

export default ChatDetails;
