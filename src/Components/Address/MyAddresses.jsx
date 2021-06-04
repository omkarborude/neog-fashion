import "./myaddresses.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateProvider, API, useAuth } from "../index";
import { useEffect } from "react";
import axios from "axios";
import {
  isAddressDefault,
  updateDefaultAddress,
  removeAddress,
} from "../../ApiCalls/api-calls";

export const MyAddresses = () => {
  const { state, dispatch } = useStateProvider();
  const { userId, isUserloggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="myAddresses-main-div">
      <div className="div-btn-addnewaddress-my-addresses">
        <h2 className="myAddresses-tag">My Addresses</h2>
        <button
          className="btn-addnewaddress-my-addresses"
          onClick={() => {
            navigate("/newaddress");
          }}
        >
          Add New Address <i class="fas fa-map-marker-alt"></i>
        </button>
      </div>
      <div className="myAddresses-inner-div">
        {state.userAddresses.map((address) => {
          return (
            <div className="myaddress-address-card">
              <h3 className="myaddress-address-card-name">{address.name}</h3>
              <p>{address.streetAddress}</p>
              <p>
                {address.city} <span>{address.zipCode}</span>
              </p>
              <p>
                {address.stateName} , {address.country}
              </p>
              <p>{address.phoneNumber}</p>

              <div className="myaddress-address-card-btn">
                <div className="div-address-card-select-btn">
                  {" "}
                  <button
                    className="btn-remove-address-card"
                    onClick={() => {
                      updateDefaultAddress(dispatch, userId, address._id);
                    }}
                  >
                    {isAddressDefault(
                      state?.userSelectedAddress,
                      address._id
                    ) ? (
                      <p>
                        Default <i class="fas fa-check-circle"></i>
                      </p>
                    ) : (
                      <p>Select</p>
                    )}
                  </button>
                </div>

                <div className="div-address-card-remove-btn">
                  <button
                    className="btn-remove-address-card"
                    onClick={() => {
                      removeAddress(dispatch, address._id, userId);
                    }}
                  >
                    Remove <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
