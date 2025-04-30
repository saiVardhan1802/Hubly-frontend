import React from 'react'
import { deleteUser } from '../../../services';
import toast from 'react-hot-toast';

const DeleteModal = ({ userId, setDeleteUserId }) => {
    const token = localStorage.getItem('token');
    const buttonStyles = {
        width: '30%',
        padding: '0.5em',
        borderRadius: '12px'
    }

    async function handleDelete(e) {
        e.preventDefault();
        try {
            console.log("Token: ", token);
            console.log("userId: ", userId);
            const response = await deleteUser(token, userId);
            if (!response.ok) return toast.error("Failed to delete user. Please try again.");
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div style={{
        display: 'inline',
        // width
        position: 'absolute',
        right: '1%',
        borderRadius: '12px',
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'white',
        padding: '1em',
        zIndex: '1000',
        width: '30%',
        top: '60%',
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3em',
        
        }}>
          <h3>this teammate will be deleted.</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1em'
          }}>
            <button type='button' onClick={() => setDeleteUserId('')} style={{
                backgroundColor: '#F6F8FA',
                color: '#AFAFAF',
                ...buttonStyles
            }}>
                Cancel
            </button>
            <button type='button' onClick={handleDelete} style={{
                backgroundColor: '#184E7F',
                color: 'white',
                ...buttonStyles
            }}>
                Confirm
            </button>
          </div>
        </div>
    </div>
  )
}

export default DeleteModal
