import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Pagenot from './pages/Pagenot';
import Policy from './pages/Policy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/user/DashBoard';
import PrivateRoute from './components/route/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './components/route/AdminRoute';
import AdminDasboard from './pages/Admin/AdminDasboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Allusers from './pages/Admin/Allusers';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import SingleCategory from './pages/SingleCategory';
import Cart from './pages/Cart';
// import UpdateCategory from './components/forms/UpdateCategory';
function App() {
  
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home></Home>}/>
      <Route exact path='/search' element={<Search></Search>}/>
      <Route exact path='/categories' element={<Categories/>}/>
      <Route exact path='/category/:id' element={<SingleCategory/>}/>
      <Route exact path='/more-details/:id' element={<ProductDetails></ProductDetails>}/>
      <Route exact path='/about' element={<About></About>}/>
      <Route exact path='/contact' element={<Contact></Contact>}/>
      <Route exact path='/policy' element={<Policy></Policy>}/>
      <Route exact path='/register' element={<Signup></Signup>}/>
      <Route exact path='/login' element={<Login></Login>}/>
      <Route exact path='/cart' element={<Cart></Cart>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>

      <Route  path="user" element={<DashBoard/>}/>
      <Route  path="user/order" element={<Orders/>}/>
      <Route  path="user/profile" element={<Profile/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDasboard></AdminDasboard>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/update-product/:id" element={<UpdateProduct/>}/>
        <Route path="admin/users" element={<Allusers/>}/>
        <Route path="admin/products" element={<Product/>}/>
        {/* <Route path="admin/updateproduct" element={<UpdateCategory/>}/> */}
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route exact path='/*' element={<Pagenot></Pagenot>}/>
    </Routes>
    </>
      
  );
}

export default App;
