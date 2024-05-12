import React, { useEffect, useState } from 'react';
import Admin from './Pages/Admin/Admin';
import Navbar from './Compoments/Navbar/Navbar';
import { OrdersProvider } from './Context/Allcontext';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract token from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    const token = decodeURIComponent(tokenParam);
    
    if (token) {
      
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
      <OrdersProvider>
        <Navbar />
        <Admin />
      </OrdersProvider>
    </div>
  );
}

export default App;
