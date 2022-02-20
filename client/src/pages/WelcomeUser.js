import React, {useState} from "react";
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import AddProductForm from "../components/AddProductForm";
import Button from '@material-ui/core/Button';
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from "@material-ui/core";
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
    const [state, setState] = useState({
        openModal: props.existingUser ? false : true,
        openDialog: props.existingUser ? true : false
    })

    const [globalState, setGlobalState] = useGlobalState()
    const navigate = useNavigate();

    const changeToHomeScreen = (event) => {
        navigate(`/home/${globalState.userName}`);
    }

    const handleModalClose = (event) => {
        setState(state => ({
            ...state,
            openModal: false
        }))
    }

    const handleDialogClose = (event) => {
        setState(state => ({
            ...state,
            openDialog: false
        }))
    }
    
    return(
        <div>
            <Dialog
                open={state.openDialog}
                onClose={() => {handleDialogClose}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {`Welcome back ${globalState.userName} 🎊🎊🎊`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Would you like to add a review?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {handleDialogClose}}>
                    <b>Yes</b>
                </Button>
                <Button onClick={() => {changeToHomeScreen}} autoFocus>
                    <b>No</b>
                </Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={state.openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{textAlign: 'center'}} id="modal-modal-title" variant="h6" component="h2">
                        Welcome {globalState.userName} 🎊🎊🎊
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        We are excited to have you here !! <br/>
                        Click anywhere on the screen to continue
                    </Typography>
                </Box>
            </Modal>
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