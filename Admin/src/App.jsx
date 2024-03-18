import React from 'react'
import Admin from './Pages/Admin/Admin'
import Navbar from './Compoments/Navbar/Navbar'
import { OrdersProvider } from './Context/Allcontext'

const App = () => {
  return (
    <div>
<OrdersProvider>

      <Navbar/>
      <Admin/>
</OrdersProvider>
    </div>

  )
}

export default App
