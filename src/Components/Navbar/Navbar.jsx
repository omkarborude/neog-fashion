import "./navbar.css"
import { Link, NavLink } from "react-router-dom";
import {useAuth} from "../index"
export function Navbar () {

  const {  userDetails,isUserloggedIn,username } = useAuth();
  return (
    
  <div className="nav">
    <Link to="/" className="Link">
      <div className="logo">
      NeoG Fashion</div>
      </Link>
       <input type="checkbox" id="click"/>
        <label for="click" className="menu-btn">
         <i className="fas fa-bars"></i>
        </label>

      <ul>

        <Link end to="/" className="Link">
        <li><a  href="#">Home</a></li>
        </Link>

         <Link end to="/products" className="Link" >
         <li><a href="#">Shop Now</a></li>
         </Link>

         <Link to="cart" className="Link">
         <li><a href="#">Cart <i class="fas fa-shopping-cart"></i></a></li>
         </Link>

        {isUserloggedIn ? 
          <Link to="/account" className="Link">
        <li className="account-div">
          <a><i class="fas fa-user-alt"></i></a>
         {username ? `Hi,${username} `:"Login"}
        </li> </Link> : 
        
        <Link to="/login" className="Link">
        <li className="account-div">
          <a><i class="fas fa-user-alt"></i></a>
          Login</li>
          </Link>
          }

      </ul>
  </div>
  );
  }