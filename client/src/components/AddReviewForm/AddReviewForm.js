import React, {useState, useCallback, useEffect} from "react";
import withStyles from '@mui/styles/withStyles';
import {useNavigate} from 'react-router-dom';
import {Grid, Typography, CardHeader, Card, FormControl, TextareaAutosize, Paper}  from '@mui/material';
import axios from 'axios';
import {AddReviewFormStyler} from "../../assets/js/AddReviewFormStyler";
import CustomInput from './CustomInput';
import CustomButton from "./CustomButton";
import CustomAutoComplete from './CustomAutoComplete';
import '../../assets/css/addReviewForm.css';

export const Period = {
    DAYS: 1,
    WEEKS: 7,
    MONTHS: 30,
    YEARS: 365
};
Object.freeze(Period);

const AddReviewForm = (props) => {
    const [state, setState] = useState({
            brand: '',
            product: '',
            lengthOfUse: 0,
            periodOfUse: Period.DAYS,
            review: ''
    });
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        await axios.post(`${window.location.origin.toString()}/product/addNewProductReview`, {
            userName: state.userName,
            productBrand: state.brand,
            productName: state.product,
            lengthOfUse: state.lengthOfUse,
            reviewText: state.review
        })
        .then(
            navigate(`/home/${globalState.userName}`)
        );
    }
    
    const handleChange = (stateName, value) => {
        setState(state => ({
            ...state,
            [stateName]: value,
        }));
    };

    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/brand`, {
        }).then(
            brands => {
                const brandList = []
                brands.data['data'].forEach((brand, index) => {
                    brandList.push({"label": brand.Name, "id": index})
                });
                setOptions(brandList);
            }
        )
    }, []);

    const cardTitle = props.cardTitle;
    const buttonText = props.buttonText;
    const classes = props.classes;
    // const {register} = useForm();
    return (
        <Card className={classes.card} elevation={10}>
            <div className='addReviewForm'>
            <CardHeader 
                className={classes.customTitle} 
                title={<Typography sx={{ fontWeight: 'bold', fontSize: 18 }} variant={"h6"}>{cardTitle}</Typography>} 
            />
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                borderColor={'red'}
                rowSpacing={5}
            >
                <FormControl>
                <CustomAutoComplete id="brand"
                        label="Brand (e.g. Fenty Beauty)"
                        options={options}
                        onBlurCallbackFunc={useCallback((value) => handleChange("brand", value), [state.brand])}/>
                <CustomInput  
                    id="product" 
                    label="Product (e.g. Universal Lip Luminizer)" 
                    onBlurCallbackFunc={useCallback((value) => handleChange("product", value), [state.product])}/>
                <CustomInput 
                    id="lengthOfUse"
                    label="How long you’ve used it (e.g. 2 years)"
                    onBlurCallbackFunc={(e) => handleChange("lengthOfUse", e)}/>
                <TextareaAutosize
                    id="review"
                    label="Why you love it" 
                    placeholder="Please provide more information about the product"
                    minRows={3}
                    callbackFunc={(e) => handleChange("review", e)}/>
                <CustomButton id="AddReviewButton" text="Start Discovering Products" onClickCallbackFunction={(e) => handleSubmit(e)}/>
                </FormControl>
            </Grid>
            </div>
        </Card>
    );
}

export default withStyles(AddReviewFormStyler)(AddReviewForm);