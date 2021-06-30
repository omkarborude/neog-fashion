import axios from "axios";
import { useState } from "react";
import "./signup.css"
import {API} from "../index"
import {useNavigate,useLocation} from 'react-router-dom';
import {useAuth} from '../index';


export const SignUp = () => {
    const navigate = useNavigate();
    const { dispatch ,username } = useAuth();
    const [state,setState] = useState({email:"",password:"",username:""});
    const [errors,seterrors] = useState({email:"",password:"",username:""});
    const [showPassword,setShowPassword] = useState(false);
    console.log(state)
    const path = useLocation().state;


    // input handler
    const handleChange = (e) => {
        const {value,name} = e.target;
        setState(state => ({...state,[name]:value}))
    }

    // validate Input
    const InputValidate = (data) => {
        let username,email,password;

        if(data.username === "") {
            username="Please Enter the username"
        }
        if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(data.email)) {
            email="Please Enter Valid Email"
        }
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(data.password)){
            password="Password should contain 8 letters(atleast 1 number,  smallcase and uppercase alphabets"
   
            seterrors({username,email,password})
            if(!username && !email && !password){
                return true;
            }
        }
    }

    //  submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const {status,data } = await axios.post("https://bgletry.omkarborude8354.repl.co/users/signup",
            state);
            console.log(status)
             if( status === 200 ){
               localStorage.setItem('authToken',JSON.stringify(
                 {login:true,data}));
               dispatch({ type:"LOGIN_USER",payload:data })
               dispatch({tyoe:"SET_LOGIN",payload:true})
               navigate( "/")
           
            
             } else {
                navigate(path === null ? "/login" : path.from)
             }
             console.log(data)

          } catch (error) {
            
             const { status, data } = error.response;

             if(status === 401){
               seterrors(state => ({...state,password:data.message}))
             
             }
             else if(status === 404){
               seterrors(state => ({...state,email:data.message}))
              
             }
          } 
    }

    return (
        
        <div className="signup-main-div">

            <form onSubmit={handleSubmit}>
                    
                 <h1>Create Account</h1>   

                  <div className="input-div">
                         
                         {/* username input */}
                         <div className="input-inner-div">
                             <input className="get-input" value={state.username} type="text"
                             name="username" placeholder="Enter Your Username Here"
                             onChange={handleChange}
                             />
                              
                         </div>
                         {/* email input */}
                         <div className="input-inner-div">
                              <input className="get-input" value={state.email} type="email"
                              name="email" placeholder="Enter Your Email Here"
                              onChange={handleChange}
                              />
                          </div>   
                          {/* password input */}
                          <div className="signup-input-password-div">
                          <input className="signup-password-input" placeholder="Enter Your Passowrd Here"
                          type={!showPassword ? "password" : "text"} name="password"
                          value={state.password} onChange={handleChange}
                         />
                         
                          <a
                          onClick={() => setShowPassword(state => !state)}
                          >
                           {showPassword ?<i class='bx bx-show'></i> : <i class='bx bx-hide'></i> }

                          </a>
                          </div>

                  </div>
                       
                      <div>
                          <input 
                         
                          type="submit" className="btn-submit" value="SIGNUP"
                          />
                          </div> 
            </form>

        </div>
    )
} 