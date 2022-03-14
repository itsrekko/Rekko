import React from "react";
import PropTypes from 'prop-types';
import AddReviewForm from "../components/AddReviewForm/AddReviewForm";
import {useNavigate} from 'react-router-dom';
import {useGlobalState} from '../context/GlobalState';

const WelcomeUser = (props) => {
    const [globalState] = useGlobalState();

    const navigate = useNavigate();

    const changeToHomeScreen = (event) => {
        navigate(`/home/${globalState.userName}`);
    }

    return(
        <div>
            <AddReviewForm
                userName={globalState.userName}
                userId={globalState.userId}
                cardTitle={props.cardTitle}
                buttonText={props.buttonText}
                buttonAction={changeToHomeScreen}
            />
        </div>
    );
}

WelcomeUser.propTypes = {
    cardTitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    existingUser: PropTypes.bool.isRequired,
};

WelcomeUser.defaultProps = {
    existingUser: false,
};

export default WelcomeUser;