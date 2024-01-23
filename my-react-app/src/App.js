import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';


function App() {
  return (
   <div className="App">
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/Mens' element={<ShopCategory category="Men"/>}/>
            <Route path='/Womens' element={<ShopCategory category="Women"/>}/>
            <Route path='/Kids' element={<ShopCategory category="Kids"/>}/>
            <Route path="Product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Login' element={<LoginSignup/>}/>





        </Routes>
        
    </BrowserRouter>
   </div>
  );
}

export default App;
