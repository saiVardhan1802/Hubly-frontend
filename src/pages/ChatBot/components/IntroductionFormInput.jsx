import React from 'react';
import styles from './styles/IntroductionFormInput.module.css'
import { ACTIONS, useCustomization, useCustomizationDispatch } from '../../../services/Context/ChatBotCustomization';

const IntroductionFormInput = ({ title, customization, formTitle, visitorData, setVisitorData }) => {
    // const customization = useCustomization();
    const dispatchCustomization = useCustomizationDispatch();
    console.log(title)

    const lowerCaseTitle = title.toLowerCase();

    function handleChange(e) {
        const { value } = e.target;
        dispatchCustomization({ type: ACTIONS.SET_INTRODUCTION_FORM, payload: { key : lowerCaseTitle, value }});
    }

    function handleChangeInLander(e) {
      const { value } = e.target;
      setVisitorData(prev => ({
        ...prev, [lowerCaseTitle] : value
      }))
    }
  return (
    <div className={styles.wrapper}>
      <label htmlFor={title}>Your {title}</label>
      {formTitle==='Introduce Yourself'?
        <input type="text" 
          id={title} 
          placeholder={customization?.introductionForm[lowerCaseTitle]} 
          value={visitorData?.lowerCaseTitle} 
          onChange={e => handleChangeInLander(e)}
        />
        :
        <input type="text" id={title} value={customization?.introductionForm[lowerCaseTitle]} onChange={(e) => handleChange(e)} />
      }
    </div>
  )
}

export default IntroductionFormInput
