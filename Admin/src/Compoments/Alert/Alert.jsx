import React, { createContext, useContext, useRef, useEffect } from 'react';
import './Alert.css';

// Create a context for the alert state
const AlertContext = createContext();

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext);

// Alert Provider component
export const AlertProvider = ({ children }) => {
    const myRef = useRef();

    // Function to update alert state
    const showAlert = (message, type) => {
        myRef.current.style.display = "block"; 
        if (type === "error") {
            myRef.current.classList.add("error");
        } else if (type === "warning") {
            myRef.current.classList.add("warning");
        } else if (type === "success") {
            myRef.current.classList.add("success");
        }

        myRef.current.textContent = message;

        setTimeout(() => {
            myRef.current.style.display = "none"; 
            
        }, 3000);
    };



    return (
        <AlertContext.Provider value={showAlert}>
            <div className='none alert' ref={myRef}></div>
            {children}
        </AlertContext.Provider>
    );
};

// Alerts component
const Alerts = () => {
    const showAlert = useAlert();
    
    
    return null; // Alerts are displayed through context, not rendered directly
};

export default Alerts;
