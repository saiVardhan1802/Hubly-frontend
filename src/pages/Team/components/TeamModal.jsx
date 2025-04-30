import React, { useEffect, useState } from 'react';
import styles from './styles/TeamModal.module.css'
import toast from 'react-hot-toast';
import { isValidEmail, isValidPhoneNumber } from '../../ChatBot/components/ChatbotComponent';
import { createNewTeamMember, editTeamMember } from '../../../services';

const TeamModal = ({ setIsModal, team, editMode, setEditMode, selectedUser, setSelectedUser }) => {
  const [memberData, setMemberData] = useState({
    phone: '',
    email: '',
    designation: 'member'
  });
  const token = localStorage.getItem('token');
  const [adminId, setAdminId] = useState('');

  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    if (editMode) {
      setMemberData({
        phone: selectedUser?.phone ? selectedUser.phone : '+1 (000) 000-0000',
        email: selectedUser?.email,
        designation: selectedUser?.role
      })
    }
  }, [editMode, selectedUser])

  useEffect(() => {
    const admin = team?.users?.filter((user) => (user.role === 'admin' || user.role === 'super-admin'))[0];
    setAdminId(admin?._id);
  }, [team])

  function handleChange(e) {
    const { name, value } = e.target;
    setMemberData(prev => ({
      ...prev, [name]: value
    }));
  };

  const roles = ['member', 'admin'];

  useEffect(() => console.log(memberData), [memberData]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!memberData.phone.trim() || !memberData.email.trim()) return toast.error('All fields are required.');
    if (!isValidPhoneNumber(memberData.phone.trim())) return toast.error('Please enter a valid phone number.');
    if (!isValidEmail(memberData.email.trim())) return toast.error('Please enter a valid Email ID.');
    if (!editMode) {
      try {
        const response = await createNewTeamMember(token, team.teamId, adminId, memberData.phone, memberData.email, memberData.designation, team.teamName);
        if (!response.ok) return toast.error("Failed to create a new member. Please try again.");
        toast.success("New team member created successfully");
      } catch (error) {
        console.error(error)
      }
    }
    else {
      //teamId, phone, email, designation, adminId, userId, teamName
      try {
        const response = await editTeamMember(token, team.teamId, selectedUser._id, adminId, memberData.phone, memberData.email, memberData.designation, team.teamName);
        if (!response.ok) return toast.error("Failed to edit new member. Please try again.");
        toast.success("New team member created successfully");

      } catch (error) {
        console.error(error);
      }
    }
    setAdminId('');
    setSelectedUser(null);
    setEditMode(false);
    setIsModal(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Team members</h2>
        <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.formContainer}>
            <div>
              <label htmlFor="phone">Phone number</label>
              <input id='phone' name='phone' type="text" placeholder='Phone number' value={memberData.phone} onChange={e => handleChange(e)} />
            </div>
            <div>
              <label htmlFor="email">Email ID</label>
              <input type="email" id="email" name='email' placeholder='Email ID' value={memberData.email} onChange={e => handleChange(e)} />
            </div>
            <div className={styles.designationContainer}>
              <p>Designation</p>
              <div>
                <button type='button' onClick={() => setDisplayOptions(prev => !prev)} className={styles.designationButton}><p>{memberData.designation}</p></button>

                {displayOptions &&
                  <div className={styles.optionButtons}>
                    {roles.map((role, index) => (
                      <button key={index} type='button'
                        onClick={
                          () => setMemberData(prev => ({
                            ...prev, designation: role
                          }))
                        }>
                        <p>{role}</p>
                      </button>
                    ))}
                  </div>}
              </div>
            </div>
          </div>
          <div className={styles.buttons} >
            <button type='button' onClick={() => {
              setIsModal(false);
              setEditMode(false);
            }} style={{
              backgroundColor: '#F6F8FA',
              color: '#AFAFAF'
            }}>Cancel</button>
            <button type='submit' style={{
              backgroundColor: '#184E7F',
              color: 'white'
            }}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamModal
