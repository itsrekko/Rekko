import React, { Component } from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Home from '../pages/Home';

const useStyles = makeStyles(() => ({
    button: {
        "&.MuiButton-root": {
          backgroundColor: '#6C5B57',
          width: "500px",
          "@media (max-width: 768px)": { width: "245px" },
          outerHeight: '30px',
          '&:hover': {
            backgroundColor: '#5e4f4b',
          }
        },
        "&.MuiButton-sizeLarge": "56px"
      },
    card: {
        marginTop: '19vh',
        height: "475px",
        "@media (max-width: 742px)": { height: "520px" },
        width: "710px",
        "@media (max-width: 768px)": { width: "78vw" },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px'
    },
    customTitle: {
        color: '#6C5B57',
        paddingTop: '32px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '30px'
    },
    textField: {
        backgroundColor: '#F5F5F7',
        width: "500px",
        "@media (max-width: 768px)": { width: "245px" },
        "& label": {
            width: "100%",
            textAlign: "left",
            transformOrigin: "left",
            "&.Mui-focused": {
                transformOrigin: "left"
            }
        },
    },

    cssLabel: {
        color: '#A0A5BD',
      },
    
      notchedOutline: {
        borderWidth: '1px',
        borderColor: '#F5F5F7 !important',
      },
      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#F5F5F7 !important`,
        },
      },
    
      cssFocused: {
        color: 'black',
      },

}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes} />;
    };
}

  
class AddProductComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            brand: '',
            product: '',
            lengthOfUse: '',
            review: '',
        }
    }

    handleSubmit = async (event) => {
        await axios.post('product/addNewProductReview', {
            userID: this.state.userid,
            productBrand: this.state.brand,
            productName: this.state.product,
            reviewText: this.state.review
        })
        .then(res => {
            this.state.buttonAction();
        });
    }
    
    handleChange = (stateValue) => (event) => {
        this.setState({
          [stateValue]: event.target.value,
        });
    };

    render(){
        const {classes} = this.props;
        const cardTitle = this.props.cardTitle;
        const buttonText = this.props.buttonText;
        return (
            <div className={classes.card}>
                <div className={classes.customTitle}>
                    {cardTitle}
                </div>
                <Grid
                    container
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <TextField
                        id="standard-name"
                        label="Brand* (e.g. Fenty Beauty)"
                        value={this.state.brand}
                        onChange={this.handleChange('brand')}
                        className={classes.textField}
                        variant="outlined"
                        style={{
                            marginBottom: '20px',
                            minHeight: '56px',
                            maxHeight: '56px',
                        }}
                        InputLabelProps={{
                            classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            inputProps: {
                            style: { textAlign: "left" },
                            },
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: 'numeric',
                        }}
                    />
                    <TextField
                        id="standard-name"
                        label="Product* (e.g. Universal Lip Luminizer)"
                        value={this.state.product}
                        onChange={this.handleChange('product')}
                        className={classes.textField}
                        variant="outlined"
                        style={{
                            marginBottom: '20px',
                            minHeight: '56px',
                            maxHeight: '56px',
                        }}
                        InputLabelProps={{
                            classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            inputProps: {
                            style: { textAlign: "left" },
                            },
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: 'numeric',
                        }}
                    />
                    <TextField
                        id="standard-name"
                        label="How long you’ve used it* (e.g. 2 years)"
                        value={this.state.lengthOfUse}
                        onChange={this.handleChange('lengthOfUse')}
                        className={classes.textField}
                        variant="outlined"
                        style={{
                            marginBottom: '20px',
                            minHeight: '56px',
                            maxHeight: '56px',
                        }}
                        InputLabelProps={{
                            classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            inputProps: {
                            style: { textAlign: "left" },
                            },
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: 'numeric',
                        }}
                    />
                    <TextField
                        id="standard-name"
                        label="Why you love it*"
                        value={this.state.review}
                        onChange={this.handleChange('review')}
                        className={classes.textField}
                        variant="outlined"
                        style={{
                            marginBottom: '20px',
                            minHeight: '56px',
                            maxHeight: '56px',
                        }}
                        InputLabelProps={{
                            classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            inputProps: {
                            style: { textAlign: "left" },
                            },
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: 'numeric',
                        }}
                    />
                    <Button 
                        id="login-submit-button"
                        variant="contained" 
                        className={classes.button}
                        style={{
                            textTransform: 'none',
                            minHeight: '54px',
                            maxHeight: '54px',
                            marginBottom: '30px'
                        }}
                    onClick={this.handleSubmit}
                    >
                        <Typography style={{
                            fontWeight: 550,
                            lineHeight: '21.47px',
                            fontSize: '17px',
                            color: '#FFFFFF'
                        }}>
                            {buttonText}
                        </Typography>
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default withMyHook(AddProductComponent);