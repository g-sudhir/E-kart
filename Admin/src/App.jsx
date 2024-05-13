import React, { useEffect, useState } from 'react';
import Admin from './Pages/Admin/Admin';
import Navbar from './Compoments/Navbar/Navbar';
import { OrdersProvider } from './Context/Allcontext';
import { AlertProvider } from '../../my-react-app/src/Components/Alerts/Alerts';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      let token = localStorage.getItem('token');

      // If token is not in localStorage, check URL for token parameter
      if (!token) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
      }

      if (token) {
        try {
          const response = await fetch('http://3.107.70.18:4000/isAdmin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
          });

          if (!response.ok) {
            throw new Error('Failed to validate token');
          }

          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      setIsLoading(false);
    };

    fetchToken();
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
