import React from "react";
import rekkoLogo from '../rekkoLogo.svg';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { API_URLs } from "../consts/awsConsts";
import {useGlobalState} from '../context/GlobalState';
import AuthVerifyForm from "../components/AuthVerifyForm";
import '../assets/css/login.css';

const VerifyCode = () => {
    const [globalState, setGlobalState] = useGlobalState();
    const navigate = useNavigate();
    const checkAuthCode = async (childlocalState, childlocalSetState) => {
        try{
            console.log(childlocalState);
            console.log(globalState.userName);
            const checker  = await Auth.confirmSignUp(globalState.userName, childlocalState.code);

            console.log('User has confirmed', checker);
            childlocalSetState({...childlocalState, errorFound: false});
            return true;
        }
        catch (error)
        {
            console.log('Error signing up:', error);
            childlocalSetState({...childlocalState, errorFound: true, errorText: error.message});
            return false;
        }
    };

    const confirmUserSignUp = async (childlocalState, childlocalSetState) => {
        const validCodeVerify = await checkAuthCode(childlocalState, childlocalSetState);
        if (!validCodeVerify){
            return;
        }

        var config = {
            method: 'post',
            url:  `${API_URLs.REKKO_REST_API}/user/createNewUser`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                userName: globalState.userName
            })
        };

        await axios(config)
        .then(res => {
            if (res.data.existingUser){
                setGlobalState({
                    ...globalState,
                    userId: res.data._id,
                    existingUser: true
                });
                navigate(`/home/${globalState.userName}`);
            }
            else{
                setGlobalState({
                    ...globalState,
                    userId: res.data._id,
                    existingUser: false
                })
                navigate('/welcome');
            }
        });
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
                <AuthVerifyForm
                    handleFormSubmitAction={confirmUserSignUp}
                />
            </div>
        </div>
    );
}

export default VerifyCode;