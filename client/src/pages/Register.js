import React from "react";
import rekkoLogo from '../rekkoLogo.svg';
import '../assets/css/register.css';
import CustomLoginForm from "../components/CustomLoginForm";

const Register = () => {
    return(
        <div>
            <img src={rekkoLogo} className="App-logo" alt="logo" />
            <header className="register-header">
                <div className="register-title">
                    Discover your next beauty and wellness obsession
                </div>
                <p className="register-text register-sub-title">
                    Find the best products from trusted sources
                </p>
            </header>
                <CustomRegisterForm />
        </div>
    );
}

export default Register;