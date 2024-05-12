import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import Details from "./Pages/Details"
import Alerts from './Components/Alerts/Alerts';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import { useContext } from 'react';
function App() {
   function isLoggedIn(){
    if(localStorage.getItem('auth-token')){
      return 1;
    }
    return 0;
   }
  return (
   <div className="App">
    <BrowserRouter>
        
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/Men' element={<ShopCategory banner={men_banner} category="men"/>}/>
            <Route path='/Women' element={<ShopCategory banner={women_banner} category="women"/>}/>
            <Route path='/Kids' element={<ShopCategory banner={kids_banner} category="kids"/>}/>
            <Route path="Product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Login' element={<LoginSignup/>}/>
            {isLoggedIn() ? ( // Conditionally render Details component based on authentication status
            <Route path="/details" element={<Details />} />
          ) : (
            <Route path="/details" element={<Navigate to="/Login" replace />} /> // Redirect to Login if not authenticated
          )}

          <Route path="*" element={<NotFoundPage />} /> 


        </Routes>
        <Footer/>
        
    </BrowserRouter>
   </div>
  );

}
export default App;