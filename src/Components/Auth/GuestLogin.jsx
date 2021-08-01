import "./auth.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../index";
import axios from "axios";
import { useState } from "react";

export const GuestLogin = () => {
  const [state, setState] = useState({
    email: "test@gmail.com",
    password: "testing",
  });
  const { dispatch, username } = useAuth();
  const navigate = useNavigate();

  //   login

  const Login = async () => {
    try {
      const { status, data } = await axios.post(
        "https://bgletry.omkarborude8354.repl.co/users/login",
        state
      );
      if (status === 200) {
        localStorage.setItem(
          "authToken",
          JSON.stringify({ login: true, data })
        );
        dispatch({ type: "LOGIN_USER", payload: data });
        dispatch({ tyoe: "SET_LOGIN", payload: true });
        navigate("/products");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="guest-login-div">
      <button
        className="login-guest-btn"
        onClick={() => {
          Login();
        }}
      >
        Login as guest <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};
