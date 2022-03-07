import React, { Component, useCallback, useState } from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {useDropzone} from 'react-dropzone';
import {PICTURES_API} from '../consts/awsConsts';
import AddProductFileStyler from "../utils/AddProductFileStyler";
import "../assets/css/dropzone.css";

let uploadFile = undefined;
let uploadFileName = '';
let presignedPostUrl = '';

const DropZoneToUploadFile = (props) => {
    const [state, setState] = useState({
      topText: 'Click here / Drag and drop to add your favourite picture of the product',
      bottomText: '(Please note only images will be accepeted)',
      warnTextColour: 'black'
    });
  
    const onDropAccepted = useCallback(async acceptedFiles => {
      console.log(acceptedFiles[0]);
      setState({
        topText: `${acceptedFiles[0].path} - ${acceptedFiles[0].size} bytes`,
        bottomText: `Accepted`,
        warnTextColour: 'green'
      })


      // start generating a link here
      console.log(props.userName.replace(/ /g,'')) // remove_all_spaces
      uploadFileName = `${props.userName.replace(/ /g,'')}-${Date.now()}-${acceptedFiles[0].path}`;
      console.log(uploadFileName);
      var data = JSON.stringify({
          "fileName": uploadFileName,
          "fileType": acceptedFiles[0].type
      })

      var config = {
        method: 'post',
        url: PICTURES_API.UPLOAD_PICTURE_URL,
        data : data
      };
      
      await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            uploadFile = acceptedFiles[0];
            presignedPostUrl = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
  
    const onDropRejected = useCallback(rejectedFiles => {
      console.log(rejectedFiles[0]);
      setState({
        topText: `${rejectedFiles[0].file.path} rejected`,
        bottomText: `Please upload the correct file format`,
        warnTextColour: 'red'
      })
    }, []);
  
    const {
      getRootProps,
      getInputProps
    } = useDropzone({
      accept: 'image/jpeg,image/png',
      maxFiles: 1,
      onDropAccepted: onDropAccepted,
      onDropRejected: onDropRejected
    });
  
    return (
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })} style={{ color: state.warnTextColour }} >
          <input {...getInputProps()} />
          <p className="inner-text">
           {state.topText}
            <br/>
            <em className="mini-text">{state.bottomText}</em>
          </p>
        </div>
      </section>
    );
}

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
        console.log(uploadFile);
        if (uploadFileName !== '')
        {
            let formData = new FormData();
            formData.append('Content-Type', uploadFile.type);
            Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
                formData.append(k, v);
            });
            formData.append('file', uploadFile);
            await axios.post(presignedPostUrl.url, formData, {
                headers: {'Content-Type': uploadFile.type},
            });
        }
        
        await axios.post(`${window.location.origin.toString()}/product/addNewProductReview`, {
            userName: this.state.userName,
            productBrand: this.state.brand,
            productName: this.state.product,
            imageName: uploadFileName,
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
                    <DropZoneToUploadFile userName={this.state.userName}/>
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