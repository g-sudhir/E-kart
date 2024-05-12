import React, { useState, useContext } from 'react';
import './NewsLetter.css';
import { useAlert } from '../Alerts/Alerts'; // Import the useAlert hook

const NewsLetter = () => {
    const [inputValue, setInputValue] = useState("");
    const showAlert = useAlert(); // Use the useAlert hook to access showAlert function

    function handleChange(event) {
        // Update the state with the current value of the input field
        setInputValue(event.target.value);
    }

    async function handleSubmit(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Here you can do something with the input value, like sending it to an API or processing it
        const response = await fetch("http://localhost:4000/addSubscription", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": inputValue }),
        })

        // Show alert based on response or any other condition
        if (response.ok) {
            showAlert("Subscription successful!", "success");
        } else {
            showAlert("Subscription failed. Please try again later.", "error");
        }

        // Clear the input field after submission if needed
        setInputValue("");
    }

    return (
        <div>
            <div className="newsletter">
                <h1>Get Exclusive Offers On your Email</h1>
                <p>Subscribe to our newsletter and stay updated</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" value={inputValue} onChange={handleChange} placeholder='Your Email here' />
                        <button type="submit" style={{cursor:'pointer'}}>Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewsLetter;
