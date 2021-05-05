import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {StateProvider} from "./Context/MainContext/StateProvider"
import {AuthProvider} from "./Context/AuthContext/AuthProvider"

ReactDOM.render(
  <React.StrictMode>

    <StateProvider>
        <Router>
      <AuthProvider>
 
    <App />

    </AuthProvider>
    </Router>
    </StateProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

