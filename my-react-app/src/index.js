
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from '../src/Context/ShopContext';
import { AlertProvider } from './Components/Alerts/Alerts.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
const { useAlert } = require("./Components/Alerts/Alerts");

function NetworkSpeedChecker() {
    const showAlert=useAlert()
    useEffect(() => {
        function isSlowNetwork() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                const downlinkSpeed = connection.downlink; // Megabits per second (Mbps)
                const effectiveType = connection.effectiveType; // 'slow-2g', '2g', '3g', or '4g'

                // You can adjust these thresholds based on your definition of a slow network
                if (effectiveType === 'slow-2g' || downlinkSpeed < 0.5) { // 0.5 Mbps
                    return true;
                }
            }
            return false;
        }

        function checkNetworkSpeed() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (!connection) {
                // Handle case when network information is not available
                return;
            }

            if (isSlowNetwork()) {
                showAlert("Slow network detected","warning");
            } else {
                // alert("Network speed is acceptable");
            }
        }

        const intervalId = setInterval(checkNetworkSpeed, 3000); // Check every 3 seconds

        return () => clearInterval(intervalId); // Cleanup function to clear the interval

    }, []); // Empty dependency array means the effect runs only once after the component mounts

    return null; // This component doesn't render anything
}


root.render(
    <AlertProvider> {/* Wrap your App with AlertProvider */}
        <ShopContextProvider>
            <App />
            <NetworkSpeedChecker /> {/* Render the NetworkSpeedChecker component */}
        </ShopContextProvider>
    </AlertProvider>,
);

reportWebVitals();