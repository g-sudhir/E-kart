import React, { useEffect, useState } from 'react';
import Admin from './Pages/Admin/Admin';
import Navbar from './Compoments/Navbar/Navbar';
import { OrdersProvider } from './Context/Allcontext';
import { AlertProvider } from '../../my-react-app/src/Components/Alerts/Alerts';
import { useContext } from 'react';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Token exists, validate it
      fetch('http://localhost:4000/isAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to validate token');
        }
        return response.json();
      })
      .then(data => {
        setIsAdmin(data.isAdmin);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    } else {
      // No token found in localStorage
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Unauthorized access</div>;
  }
  
  return (
    <div>
      <AlertProvider>
        <OrdersProvider>
          <Navbar />
          <Admin />
        </OrdersProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
