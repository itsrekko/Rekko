import React, {useState} from "react";
import {Link} from 'react-router-dom';
import rekkoLogo from '../rekkoLogo.svg';
import '../assets/css/login.css';
import CustomLoginForm from "../components/CustomLoginForm";

const Login = () => {
    return(
        <div>
            <img src={rekkoLogo} className="App-logo" alt="logo" />
            <header className="login-header">
                <div className="login-title">
                    Discover your next beauty and wellness obsession
                </div>
                <p className="login-text login-sub-title">
                    Find the best products from trusted sources
                </p>
            </header>
            <div>
                <CustomLoginForm />
            </div>
            <div className="login-text login-sub-title">
                <Link to="/register">Create new Account</Link> 
            </div>
            <div className="login-text login-sub-title">
                <Link to="/register">Forgot your Password ?</Link> 
            </div>
        </div>
    );
}

export default Login;