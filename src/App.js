import { ToastContainer, toast } from "react-toastify";
import {
  getApiProduct,
  LoadAllProducts,
  LoadUserAddresses,
  LoadUserCartWishList,
  LoadUserOrder,
} from "./ApiCalls/api-calls";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";

import {
  Login,
  Home,
  Navbar,
  API,
  useStateProvider,
  Profile,
  ProductListing,
  SignUp,
  useAuth,
  Cart,
  WishList,
  AddNewAddress,
  MyAddresses,
  MyOrders,
  ProudctDetails,
} from "./Components/index";

function App() {
  const { isUserloggedIn, userId } = useAuth();
  const { dispatch, state } = useStateProvider();

  // Load product from server
  useEffect(() => {
    LoadAllProducts(dispatch);
  }, []);

  // load user Cart/Wishlist from server
  useEffect(() => {
    if (isUserloggedIn) {
      LoadUserCartWishList(dispatch, userId);
      LoadUserOrder(dispatch, userId);
      LoadUserAddresses(dispatch, userId);
    }
  }, [isUserloggedIn]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:productId" element={<ProudctDetails />} />
        <PrivateRoute path="/account" element={<Profile />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <PrivateRoute path="/newaddress" element={<AddNewAddress />} />
        <PrivateRoute path="/myaddresses" element={<MyAddresses />} />
        <PrivateRoute path="/myorders" element={<MyOrders />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
