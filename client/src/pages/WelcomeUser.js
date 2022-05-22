import React from "react";
import PropTypes from 'prop-types';
import AddReviewForm from "../components/AddReviewForm";
import {useNavigate} from 'react-router-dom';
import {useGlobalState} from '../context/GlobalState';
import {Modal, Button, Box} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}
const WelcomeUser = (props) => {
    const [globalState] = useGlobalState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const changeToHomeScreen = (event) => {
        navigate(`/home/${globalState.userName}`);
    }

    return(
        <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
            disableEnforceFocus
            open={open}
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                  handleClose();
                }
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
                <AddReviewForm
                    userName={globalState.userName}
                    userId={globalState.userId}
                    cardTitle={props.cardTitle}
                    buttonText={props.buttonText}
                    buttonAction={changeToHomeScreen}
                />
            </Box>
        </Modal>
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