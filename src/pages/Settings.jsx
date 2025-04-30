import React, { useContext, useState } from 'react';
import styles from './styles/Settings.module.css';
// import NavBar from '../components/NavBar';
// import eventsIcon from '../assets/navbar/inactive/eventsIcon.png';
// import bookingIcon from '../assets/navbar/inactive/bookingIcon.png';
// import availabilityIcon from '../assets/navbar/inactive/availabilityIcon.png';
// import settingsIcon from '../assets/navbar/active/settingsIcon.png'
// import MobileHeader from '../components/MobileHeader';
import { updateUser } from '../services';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { FiInfo } from "react-icons/fi";
import { UserContext } from '../services/Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const token = localStorage.getItem('token');
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function HandleTextInput(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev, [name]: value
    }))
  };

  async function HandleSubmit(e) {
    try {
      e.preventDefault();
      if (profileData.confirmPassword || profileData.password) {
        const errors = validatePassword(profileData.password, profileData.confirmPassword);
        if (errors.length > 0) {
          toast.error(errors.join("\n"), { autoClose: 5000 });
          return;
        }
      }
      const response = await updateUser(token, profileData, user.id);
      const data = await response.json();
      if (!response.ok) return toast.error(data.message || "Failed update profile. Please try again.");
      if (data.password || data.email) {
        localStorage.clear();
        navigate('/sign-in');
      }
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error updating profile: ", error);
    }
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.main}>
        <h2 className={styles.mobileNone}>Profile</h2>
        <p className={styles.mobileNone}>Manage your profile</p>

        <div className={styles.container}>
          <div className={styles.containerHead}>
            <p>Edit Profile</p>
          </div>
          <form onSubmit={HandleSubmit}>
            <div className={styles.formWrapper}>
              <div>
                <p>First name</p>
                <input name='firstName' type="text" value={profileData.firstName} onChange={HandleTextInput} />
              </div>
              <div>
                <p>Last name</p>
                <input name='lastName' type="text" value={profileData.lastName} onChange={HandleTextInput} />
              </div>
              <div>
                <p>Email</p>
                <div className={styles.dangerField}>
                  <input name='email' type="text" value={profileData.email} onChange={HandleTextInput} />
                  <button type='button' className={styles.infoButton}
                    onMouseEnter={() => setShowMessage("email")}
                    onMouseLeave={() => setShowMessage(null)}
                  >
                    <FiInfo />
                    {showMessage === 'email' &&
                      <div style={{
                        display: 'inline',
                        position: 'absolute',
                        backgroundColor: '#F3F3F3',
                        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)',
                        width: '17em',
                        padding: '0.5em 0',
                        borderRadius: '10px',
                        color: '#7C7C7C',
                        top: '50%',
                      }}>
                        <p>User will be logger out immediately</p>
                      </div>
                    }
                  </button>
                </div>
              </div>
              <div>
                <p>Password</p>
                <div className={styles.dangerField}>
                  <input name='password' type="password" value={profileData.password} onChange={HandleTextInput} />
                  <button type='button' className={styles.infoButton}
                    onMouseEnter={() => setShowMessage("password")}
                    onMouseLeave={() => setShowMessage(null)}
                  >
                    <FiInfo />
                    {showMessage === 'password' &&
                      <div style={{
                        display: 'inline',
                        position: 'absolute',
                        backgroundColor: '#F3F3F3',
                        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)',
                        width: '17em',
                        padding: '0.5em 0',
                        borderRadius: '10px',
                        color: '#7C7C7C',
                        top: '50%',
                      }}>
                        <p>User will be logger out immediately</p>
                      </div>
                    }
                  </button>
                </div>
              </div>
              <div>
                <p>Confirm Password</p>
                <div className={styles.dangerField}>
                  <input name='confirmPassword' type="password" value={profileData.confirmPassword} onChange={HandleTextInput} />
                  <button type='button' className={styles.infoButton}
                    onMouseEnter={() => setShowMessage('confirm')}
                    onMouseLeave={() => setShowMessage(null)}
                  >
                    <FiInfo />
                    {showMessage === 'confirm' &&
                      <div style={{
                        display: 'inline',
                        position: 'absolute',
                        backgroundColor: '#F3F3F3',
                        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)',
                        width: '17em',
                        padding: '0.5em 0',
                        borderRadius: '10px',
                        color: '#7C7C7C',
                        top: '50%',
                      }}>
                        <p>User will be logger out immediately</p>
                      </div>
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.buttonClass}><button type='submit'>Save</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings;

function validatePassword(password, confirmPassword) {
  if (!password) {
    return ["Password cannot be empty."];
  }

  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[@$#!%*?&]/.test(password)) {
    errors.push("Password must contain at least one special character (@$!%*?&).");
  }
  if (errors.length === 0) {
    if (password !== confirmPassword) {
      errors.push("Confirm password does not match.");
    }
  }

  console.log("Errors found:", errors);
  return errors.length > 0 ? errors : [];
}
