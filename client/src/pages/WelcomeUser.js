import React, {useState} from "react";
import PropTypes from 'prop-types';
import AddProductForm from "../components/AddProductForm";
import { useNavigate } from 'react-router-dom';

import {useGlobalState} from '../context/GlobalState';

const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    "@media (max-width: 768px)": { width: "78vw" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const WelcomeUser = (props) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [state, setState] = useState({
        openModal: props.existingUser ? false : true,
        openDialog: props.existingUser ? true : false
    })

    const navigate = useNavigate();

    const changeToHomeScreen = (event) => {
        navigate(`/home/${globalState.userName}`);
    }

    return(
        <div>
            <AddProductForm
                userName={globalState.userName}
                userId={globalState.userId}
                cardTitle={'What’s a beauty product you can’t live without at the moment?'}
                buttonText={'Start discovering products'}
                buttonAction={changeToHomeScreen}
            />
        </div>
    );
}

WelcomeUser.propTypes = {
    existingUser: PropTypes.bool.isRequired,
};

WelcomeUser.defaultProps = {
    existingUser: false,
};

export default WelcomeUser;