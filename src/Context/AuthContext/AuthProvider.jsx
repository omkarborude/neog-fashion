import React,{ createContext,useContext, useReducer } from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const loginReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN_USER":
            return {login:true,data:action.payload}
            case "SIGNOUT_USER":
            return {login : false, data : null}
            default:
            return state;
        }
    }
    
    const [state,dispatch] = useReducer(loginReducer,JSON.parse(localStorage?.getItem('authToken')) || { login:false , data:null })
 
    function SignOut(){
        return new Promise( (res, rej) => {
            setTimeout( () => {
                localStorage?.removeItem('authToken');
                dispatch({type:"SIGNOUT_USER"});
                res({ success: true,status:200})
            },1000);
            navigate("/" )
        })
    }
  const Value = {
    isUserloggedIn:state?.login,
    userId:state?.data?.response?.userId,
    username:state?.data?.response?.username,
    useremail:state?.data?.response?.email,
    userDetails:state.data,
    dispatch,
    SignOut
  }
    return (
        <AuthContext.Provider value={Value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);