import './App.css';
import {Routes,Route} from "react-router-dom";
import {API} from "./API"
import { useEffect } from 'react';
import { useStateProvider } from "./Context/MainContext/StateProvider"
import {Navbar} from "./Components/Navbar/Navbar"
import {Home} from "./Components"
import {Login,Profile,SignUp,useAuth,Cart} from "./Components/index";
import {ProductListing} from "./Components/ProductListing/productlisting"
import {getApiProduct} from "./ApiCalls/api-calls"
import {Toast} from "./Components/Toast/Toast";
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

  
 

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/account" element={<Profile/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
