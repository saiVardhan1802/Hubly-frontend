import React, { useContext, useEffect, useState } from 'react';
import styles from './styles/Team.module.css';
import NavBar from '../components/NavBar';
import { useTeams, useTeamsDispatch } from '../services/Context/TeamsContext';
import arrowsIcon from '../assets/team/arrows.svg';
import imageOne from '../assets/team/imageOne.svg';
import imageTwo from '../assets/team/imageTwo.svg';
import imageThree from '../assets/team/imageThree.svg';
import imageFour from '../assets/team/imageFour.svg';
import { UserContext } from '../services/Context/UserContext';
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import TeamModal from './Team/components/TeamModal';
import DeleteModal from './Team/components/DeleteModal';

const Team = () => {
  const teams = useTeams();
  const teamsDispatch = useTeamsDispatch();
  const [isModal, setIsModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [deleteUserId, setDeleteUserId] = useState('');

  const currentUser = useContext(UserContext);

  useEffect(() => console.log(selectedTeam), [selectedTeam]);

  const images = [imageOne, imageTwo, imageThree, imageFour];
  return (
    <>
      <div className={styles.page}>
        <NavBar />
        <div className={styles.main}>
          <h1>Teams</h1>
          <div className={styles.teamsContainer}>
            {Object.values(teams)?.map((team, index) => (
              <div key={index} className={styles.teamMembersContainer}>
                {/* Team Name */}
                <h2>{team.teamName}</h2>
                {/* Users under each team */}
                <div style={{ overflow: 'visible'}} className={styles.teamGrid}>
                  <div style={{ overflow: 'visible'}} className={styles.teamHeader}>
                    <div></div>
                    <div className={styles.teamMemberName}>
                      <p>Full Name</p>
                      <img src={arrowsIcon} alt="" />
                    </div>
                    <div className={styles.teamMemberPhone}>
                      <p>Phone</p>
                    </div>
                    <div className={styles.teamMemberEmail}>
                      <p>Email</p>
                    </div>
                    <div className={styles.teamMemberRole}>
                      <p>Role</p>
                    </div>
                    <div></div>
                  </div>
                  {team.users?.map((user, idx) => (
                    <div key={idx} style={{ backgroundColor: user._id === currentUser.id && '#f5f5f5', position: 'relative' }}>
                      <div className={styles.teamMemberImage}>
                        <img src={pickRandomImage(images)} alt={`${user.firstName} ${user.lastName}'s profile`} />
                      </div>
                      <div className={styles.teamMemberName}>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                      </div>
                      <div className={styles.teamMemberPhone}>
                        <p>{user.phone ? user.phone : '+1 (000) 000-0000'}</p>
                      </div>
                      <div className={styles.teamMemberEmail}>
                        <p>{user.email}</p>
                      </div>
                      <div className={styles.teamMemberRole}>
                        <p>{user.role}</p>
                      </div>
                      {(
                        (currentUser.role === 'super-admin' || currentUser.role === 'admin') &&
                        (user.role !== 'admin' && user.role !== 'super-admin')
                      ) &&
                        <div className={styles.buttons}>
                          <button type='button' onClick={() => {
                            setEditMode(true);
                            setIsModal(true);
                            setSelectedTeam(team);
                            setSelectedUser(user)
                          }}>
                            <RiEditLine color='#545454' />
                          </button>
                          <button type='button' onClick={() => setDeleteUserId(user._id)}>
                            <MdDeleteOutline color='#545454' />
                          </button>
                        </div>}
                      {deleteUserId === user._id && (
                        <DeleteModal
                          userId={deleteUserId}
                          setDeleteUserId={setDeleteUserId}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {(currentUser.role === 'super-admin' || currentUser.role === 'admin') &&
                  <button type='button' className={styles.addButton} onClick={() => { setIsModal(true); setSelectedTeam(team) }}>
                    <IoAddCircleOutline fontSize={20} />
                    <p>Add Team members</p>
                  </button>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModal &&
        <TeamModal
          setIsModal={setIsModal}
          team={selectedTeam}
          editMode={editMode}
          setEditMode={setEditMode} //teamId, phone, email, designation, adminId, userId, teamName
          selectedUser={selectedUser}
        />}
    </>

  )
}

export function pickRandomImage(images) {
  return images[Math.floor(Math.random() * images.length)];
}

export default Team
