import React from "react";
import rekkoLogo from '../rekkoLogo.svg';
import '../assets/css/login.css';import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import CustomFormContainter from "../components/CustomFormContainter";
import { API_URLs } from "../consts/awsConsts";
import {useGlobalState} from '../context/GlobalState';

const SignUp = () => {
    const [globalState, setGlobalState] = useGlobalState();
    const navigate = useNavigate();
    const checkSignUp = async (childlocalState, childlocalSetState) => {
        try{
            const user  = await Auth.signUp({
                username: childlocalState.email,
                password: childlocalState.password
            });

            console.log('User has signed up - ', user);
            childlocalSetState({...childlocalState, errorFound: false});
            return true;
        }
        catch (error)
        {
            if (error.code === 'UsernameExistsException'){
                navigate('/login');
            }
            else{
                console.log('Error signing up:', error);
                childlocalSetState({...childlocalState, errorFound: true, errorText: error.message});
            }

            return false;
        }
    };

    const signUserUp = async (childlocalState, childlocalSetState) => {
        const validSignUpCheck = await checkSignUp(childlocalState, childlocalSetState);
        if (!validSignUpCheck){
            return;
        }

        navigate('/verify');
    }

    return(
        <div>
            <img src={rekkoLogo} className="App-logo" alt="logo" />
            <header className="login-header">
                <div className="login-title">
                    Sign up to see more
                </div>
                <p className="login-sub-title">
                    Shop recommended beauty products. Love what you buy.
                </p>
            </header>
            <div>
                <CustomFormContainter
                    handleFormSubmitAction={signUserUp}
                />
            </div>
        </div>
    );
}

export default SignUp;