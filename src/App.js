import { ToastContainer, toast } from "react-toastify";
import { getApiProduct } from "./ApiCalls/api-calls";
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
    (async () => {
      const {
        data: { response },
      } = await getApiProduct(`${API}/products`);
      dispatch({ type: "LOAD_PRODUCTS", payload: response });
    })();
  }, []);

  // load user Cart/Wishlist from server
  useEffect(() => {
    if (isUserloggedIn) {
      (async () => {
        try {
          const {
            data: { response },
          } = await getApiProduct(`${API}/carts/${userId}/cart`);
          dispatch({ type: "LOAD_CART", payload: response });
        } catch (error) {
          alert(error.message);
        }
        try {
          const {
            data: { response },
          } = await getApiProduct(`${API}/wishlist/${userId}/wishlist`);
          dispatch({ type: "LOAD_WISHLIST", payload: response });
        } catch (error) {
          alert(error.message);
        }
      })();
    }
  }, [isUserloggedIn]);
  //userORder
  useEffect(async () => {
    const { status, data } = await axios.get(`${API}/userorders/${userId}`);
    dispatch({ type: "UPDATE_USER_ORDERS", payload: data.response });
  }, [isUserloggedIn]);

  // userAddress
  useEffect(async () => {
    const { status, data } = await axios.get(
      `${API}/address/${userId}/addresses`
    );
    if (status === 200 || status === 201) {
      dispatch({
        type: "UPDATE_USER_ADDRESSES",
        payload: data.response,
      });
    }
  }, [isUserloggedIn]);
  // user Default Adddress
  useEffect(async () => {
    const { status, data } = await axios.get(
      `${API}/address/${userId}/addresses/defaultaddress`
    );
    if (status === 200 || status === 201) {
      dispatch({ type: "UPDATE_DEFAULT_ADDRESS", payload: data.response });
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
