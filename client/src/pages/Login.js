import React from "react";
import rekkoLogo from '../rekkoLogo.svg';
import '../assets/css/login.css';
import CustomLoginForm from "../components/CustomLoginForm";

const Login = () => {
    return(
        <div>
            <img src={rekkoLogo} className="App-logo" alt="logo" />
            <header className="login-header">
                <div className="login-title">
                    Shop recommended beauty products. Love what you buy.
                </div>
                <p className="login-sub-title">
                    Unbiased product recommendations to help you make great purchases.
                </p>
            </header>
            <div>
                <CustomLoginForm />
            </div>
        </div>
    );
}

export default Login;