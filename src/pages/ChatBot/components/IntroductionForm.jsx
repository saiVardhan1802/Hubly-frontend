import React from 'react';
import styles from './styles/IntroductionForm.module.css';
import IntroductionFormInput from './IntroductionFormInput';
import { useLocation } from 'react-router-dom';

const IntroductionForm = ({ style, title, customization, visitorData, setVisitorData }) => {
    const titles = ['name', 'Phone', 'Email'];
    const location = useLocation();
  return (
    <div style={style} className={styles.container}>
      <h3>{title}</h3>
      <div>
          {titles.map( (componentTitle, index) => (
            <IntroductionFormInput 
              key={index} 
              formTitle={title} 
              title={componentTitle} 
              customization={customization} 
              visitorData={visitorData}
              setVisitorData={setVisitorData}
            />
          ))}
      </div>
      <button type={location.pathname==='/'? 'submit' : 'button'}>
        Thank You!
      </button>
    </div>
  )
}

export default IntroductionForm
