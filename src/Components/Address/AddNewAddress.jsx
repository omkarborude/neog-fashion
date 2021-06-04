import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateProvider, useAuth } from "../index";
import { updateNewAddress } from "../../ApiCalls/api-calls";
import "./addnewaddress.css";

export const AddNewAddress = () => {
  const { userId } = useAuth();
  const { state, dispatch } = useStateProvider();
  console.log(state);
  const navigate = useNavigate();
  const [newAddress, setNewAddress] = useState({
    name: "",
    city: "",
    streetAddress: "",
    stateName: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [error, seterror] = useState({
    name: "",
    city: "",
    streetAddress: "",
    stateName: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });
  //   const {
  //     name,
  //     city,
  //     streetAddress,
  //     stateName,
  //     country,
  //     zipCode,
  //     phoneNumber,
  //   } = newAddress;
  console.log(newAddress);

  const formValidate = (newAddress) => {
    let name, city, streetAddress, stateName, country, zipCode, phoneNumber;

    if (newAddress.name === "") {
      name = "please fill this field";
    }

    if (!/^[6789]\d{9}$/.test(newAddress.phoneNumber)) {
      phoneNumber = "Invalid mobile number";
    }

    if (newAddress.streetAddress === "") {
      streetAddress = "please fill this field";
    }
    if (newAddress.city === "") {
      city = "please fill this field";
    }
    if (newAddress.stateName === "") {
      stateName = "please fill this field";
    }
    if (newAddress.country === "") {
      country = "please fill this field";
    }

    seterror({
      name,
      city,
      streetAddress,
      stateName,
      country,
      zipCode,
      phoneNumber,
    });

    if (
      !name &&
      !city &&
      !streetAddress &&
      !stateName &&
      !country &&
      !zipCode &&
      !phoneNumber
    ) {
      return true;
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };
  return (
    <div>
      <form className="addNewAddress-form">
        <h2 className="addnewaddress-tag">Add New Address</h2>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>Name:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>City:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter City"
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>Street Address:</label>
          </div>
          <div className="new-address-enter-streetAddress-div">
            <input
              placeholder="Enter streetAddress"
              name="streetAddress"
              value={newAddress.streetAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>State Name:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter stateName"
              type="text"
              name="stateName"
              value={newAddress.stateName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>Country:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter Country"
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>Zip Code:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter Zip Code"
              type="number"
              name="zipCode"
              value={newAddress.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="new-address-inner-div">
          <div className="new-address-input-type">
            <label>Phone Number:</label>
          </div>
          <div className="new-address-enter-name-div">
            <input
              placeholder="Enter Phone Number"
              type="number"
              name="phoneNumber"
              value={newAddress.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="addAdress-btn-div">
          <button
            className="btn-addAddress-cancel"
            onClick={() => navigate("/account")}
          >
            Cancel
          </button>
          <button
            className="btn-addAddress"
            onClick={(e) => {
              e.preventDefault();
              updateNewAddress(newAddress, dispatch, userId);
              navigate("/myaddresses");
            }}
          >
            Add Address <i class="fas fa-map-marker-alt"></i>
          </button>
        </div>

        {/*  */}
      </form>
    </div>
  );
};
