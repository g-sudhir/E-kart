import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
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
function App() {
  return (
   <div className="App">
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/Men' element={<ShopCategory banner={men_banner} category="men"/>}/>
            <Route path='/Women' element={<ShopCategory banner={women_banner} category="women"/>}/>
            <Route path='/Kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
            <Route path="Product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Login' element={<LoginSignup/>}/>
            <Route path="/details" element={<Details/>}/>




        </Routes>
        <Footer/>
        
    </BrowserRouter>
   </div>
  );
}

export default App;
