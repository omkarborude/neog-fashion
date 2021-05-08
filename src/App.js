import './App.css';
import {Routes,Route} from "react-router-dom";
import { useEffect } from 'react';
import {PrivateRoute} from "./PrivateRoute";
import {Login,Home,Navbar,API,useStateProvider,Toast,Profile,ProductListing,SignUp,useAuth,Cart,WishList} from "./Components/index";
import {getApiProduct} from "./ApiCalls/api-calls"
function App() {
  const { isUserloggedIn, userId } = useAuth();
  const {dispatch,state} = useStateProvider();
  const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
      }, 1000)
  }
  // Load product from server
  useEffect (() => {
    (async () => {
     try {
        const {
          data:{response}
        } = await getApiProduct(`${API}/products`);
        dispatch({type:"TOGGLE_TOAST",payload:"Loading Product..", value: true});
        
        dispatch({type:"LOAD_PRODUCTS",payload:response})  
        hideToast()
        
     } catch(error) {
       console.log(error);
     }
     })();
  },[])


  // load user Cart/Wishlist from server
 useEffect(()=> {
  if (isUserloggedIn) {
   
    dispatch({type:"TOGGLE_TOAST",payload:"Loading Cart..", value: true});
     (async  ()  => {
      try {
        const {data:{response}} = await getApiProduct(`${API}/carts/${userId}/cart`);
        dispatch({type:"LOAD_CART",payload:response});
        hideToast()
      }catch(error) {
        console.log(error.message)
      }
      try {
        dispatch({type:"TOGGLE_TOAST",payload:"Loading Cart..", value: true});
        const {data:{response}} = await getApiProduct(`${API}/wishlist/${userId}/wishlist`);
        dispatch({type:"LOAD_WISHLIST",payload:response});
        hideToast()
      }catch(error) {
        console.log(error.message)
      }
      
    }) ()
  }
},[isUserloggedIn])


  
 

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <PrivateRoute path="/account" element={<Profile/>} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<WishList/>} />
      </Routes>
    </div>
  );
}

export default App;
