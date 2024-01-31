import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
// import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  return (
   <div className="App">
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="Men"/>}/>
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="Women"/>}/>
            <Route path='/Kids' element={<ShopCategory banner={kid_banner} category="Kids"/>}/>
            <Route path="product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>





        </Routes>
        
    </BrowserRouter>
   </div>
  );
}

export default App;
