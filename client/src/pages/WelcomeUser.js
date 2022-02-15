import React, { Component } from "react";
import Home from '../pages/Home';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import AddProductComponent from "../components/AddProductComponent";
import Button from '@material-ui/core/Button';
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from "@material-ui/core";

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

class WelcomeUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            openModal: this.props.existingUser ? false : true,
            openDialog: this.props.existingUser ? true : false   
        }
    }

    changeToHomeScreen = (event) => {
        this.props.appContext.setState({
            currentScreen: <Home appContext={this.props.appContext}/>
        })
    }

    handleModalClose = async (event) => {
        this.setState({
            openModal: false
        })
    }

    handleDialogClose = async (event) => {
        this.setState({
            openDialog: false
        })
    }

    render(){
        return(
            <div>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Welcome back ${this.state.appContext.state.username} 🎊🎊🎊`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you like to add a review?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDialogClose}>
                        <b>Yes</b>
                    </Button>
                    <Button onClick={this.changeToHomeScreen} autoFocus>
                        <b>No</b>
                    </Button>
                    </DialogActions>
                </Dialog>
                <Modal
                    open={this.state.openModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography style={{textAlign: 'center'}} id="modal-modal-title" variant="h6" component="h2">
                            Welcome {this.state.appContext.state.username} 🎊🎊🎊
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            We are excited to have you here !! <br/>
                            Click anywhere on the screen to continue
                        </Typography>
                    </Box>
                </Modal>
                <AddProductComponent
                    username={this.state.appContext.state.username}
                    userid={this.state.appContext.state.userid}
                    cardTitle={'What’s a beauty product you can’t live without at the moment?'}
                    buttonText={'Start discovering products'}
                    buttonAction={this.changeToHomeScreen}
                />
            </div>
        );
    }
}

export default WelcomeUser;

/*
 */