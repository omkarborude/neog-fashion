import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./PrivateRoute";
import "./App.css";
import {
  Login,
  Home,
  Navbar,
  Profile,
  ProductListing,
  SignUp,
  Cart,
  WishList,
  AddNewAddress,
  MyAddresses,
  MyOrders,
  ProudctDetails,
} from "./Components/index";

function App() {
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
