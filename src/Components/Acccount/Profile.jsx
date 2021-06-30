import { useAuth } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import "./profile.css";
export const Profile = () => {
  const navigate = useNavigate();
  const path = useLocation()?.state?.from;
  const { userDetails, userId, username, useremail, SignOut } = useAuth();

  return (
    <>
      <div className="profile-main-div">
        <div className="inner-main-div">
          <h3 className="accound-tag">
            Hello, <span>{username}</span>
          </h3>
          <div className="profile-info">
            <div className="profile-pic">
              <i class="far fa-id-badge"></i>
            </div>

            <div className="user-info">
              <div className="username-div">
                <p className="info-name">User Name</p>
                <p>{username}</p>
              </div>
              <div className="username-div">
                <p className="info-name">User Email</p>
                <p>{useremail}</p>
              </div>
            </div>
          </div>
          <div className="acccount-data-div">
            <div className="account-my-order-btn-div">
              <button
                className="btn-account-my-orders"
                onClick={() => navigate("/myorders")}
              >
                My Orders <i class="fas fa-shipping-fast"></i>
              </button>
            </div>

            <div>
              <button
                className="btn-account-my-orders"
                onClick={() => navigate("/myaddresses")}
              >
                My Addresses <i class="fas fa-map-marker-alt"></i>
              </button>
            </div>
          </div>

          <div className="btn-logout-div">
            <button className="btn-logout" onClick={SignOut}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
