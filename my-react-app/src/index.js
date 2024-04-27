// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from '../src/Context/ShopContext';
import { AlertProvider } from './Components/Alerts/Alerts.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertProvider> {/* Wrap your App with AlertProvider */}
        <ShopContextProvider>
            <App />
        </ShopContextProvider>
    </AlertProvider>,
);

reportWebVitals();
