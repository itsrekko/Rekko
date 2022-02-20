import React from "react";
import '../assets/css/login.css';
import CustomLoginForm from "../components/CustomLoginForm";

const Login = () => {
    return(
        <div>
            <header className="login-header">
                <div className="login-title">
                    Discover your next beauty and wellness obsessions
                </div>
                <p className="login-sub-title">
                    Find the best products from trusted sources
                </p>
            </header>
            <div>
                <CustomLoginForm />
            </div>
        </div>
    );
}

export default Login;