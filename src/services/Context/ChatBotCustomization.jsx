import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getCustomization } from '..';
import toast from 'react-hot-toast';

export const CustomizationContext = React.createContext();
export const DispatchCustomizationContext = React.createContext();

export const useCustomization = () => useContext(CustomizationContext);
export const useCustomizationDispatch = () => useContext(DispatchCustomizationContext);
export const useTimer = () => useContext(CustomizationContext).timer;

const initialState = {
    headerColor: '33475B',
    backgroundColor: 'EEEEEE',
    initialMessages: ['How can i help you?', 'Ask me anything!'],
    introductionForm: {
        name: 'Your name',
        phone: '+1 (000) 000-0000',
        email: 'example@gmail.com'
    },
    welcomeMessage: "👋Want to chat about Hubly? I'm an chatbot here to help you find your way.",
    timer: {
        hours: 1,
        minutes: 0,
        seconds: 0,
    }
}

export const ACTIONS = {
    SET_CUSTOMIZATION: 'set customization',
    SET_HEADER_COLOR: 'set header color',
    SET_BACKGROUND_COLOR: 'set background color',
    SET_INITIAL_MESSAGES: 'set initial messages',
    SET_INTRODUCTION_FORM: 'set introduction form',
    SET_WELCOME_MESSAGE: 'set welcome message',
    SET_TIMER: 'set timer'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_CUSTOMIZATION:
            return { ...state, ...action.payload};
        case ACTIONS.SET_HEADER_COLOR:
            return { ...state, headerColor: action.payload};
        case ACTIONS.SET_BACKGROUND_COLOR:
            return { ...state, backgroundColor: action.payload};
        case ACTIONS.SET_INITIAL_MESSAGES:
            const updatedInitialMessages = state.initialMessages.map((msg, idx) => 
                idx === action.payload.index ? action.payload.value : msg
            );
            return { ...state, initialMessages : updatedInitialMessages };
        case ACTIONS.SET_INTRODUCTION_FORM:
            return { ...state, introductionForm: {
                ...state.introductionForm, [action.payload.key] : action.payload.value
            }};
        case ACTIONS.SET_WELCOME_MESSAGE:
            return { ...state, welcomeMessage: action.payload};
        case ACTIONS.SET_TIMER:
            console.log(action.payload);
            return { ...state, timer: action.payload }
        default:
            return state;
    }
}

const ChatBotCustomizationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [customization, setCustomization] = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCustomization = async () => {
            try {
                const response = await getCustomization();
                if (response.status === 404) {
                    dispatch({ type: ACTIONS.SET_CUSTOMIZATION, payload: initialState});
                    return;
                }
                if (!response.ok) {
                    toast.error('Something went wrong. Please try again.');
                    return;
                }
                const data = await response.json();
                console.log(data);
                dispatch({ type: ACTIONS.SET_CUSTOMIZATION, payload: data });
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong. Please try again.');
            }
        };
    
        fetchCustomization();
    
    }, [token]);    

    useEffect(() => console.log(state), [state])

  return (
    <CustomizationContext.Provider value={state}>
        <DispatchCustomizationContext.Provider value={dispatch}>
            {children}
        </DispatchCustomizationContext.Provider>
    </CustomizationContext.Provider>
  )
}

export default ChatBotCustomizationProvider
