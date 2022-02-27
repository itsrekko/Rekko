import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import AddProductFileStyler from "../utils/AddProductFileStyler";

class AddProductForm extends Component {
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
        await axios.post(`${window.location.origin.toString()}/product/addNewProductReview`, {
            userName: this.state.userName,
            productBrand: this.state.brand,
            productName: this.state.product,
            lengthOfUse: this.state.lengthOfUse,
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
                        id="brand"
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
                        id="product"
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
                        id="lengthOfUse"
                        label="How long you’ve used it* (e.g. 2 years)"
                        placeholder="10 years"
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
                        id="review"
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
                        id="review-submit"
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

export default withStyles(AddProductFileStyler)(AddProductForm);