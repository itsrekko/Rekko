import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import withStyles from '@mui/styles/withStyles';
import {useNavigate} from 'react-router-dom';
import {Grid, Typography, CardHeader, Card, FormControl}  from '@mui/material';
import axios from 'axios';
import {AddReviewFormStyler} from "../assets/js/AddReviewFormStyler";
import CustomInput from './Form/CustomInput';
import CustomButton from "./Form/CustomButton";
import CustomAutocomplete from './Form/CustomAutocomplete';
import '../assets/css/addReviewForm.css';
import CustomSelect from "./Form/CustomSelect";
import CustomRadio from "./Form/CustomRadio";

const PeriodOptions = [
    {
        label: "DAYS",
        value: 1
    },
    {
        label: "WEEKS",
        value: 7
    },
    {
        label: "MONTHS",
        value: 30
    },
    {
        label: "YEARS",
        value: 365
    }
];

const PriceOptions = [
    {
        label: "$",
        value: 1
    },
    {
        label: "$$",
        value: 2
    },
    {
        label: "$$$",
        value: 3
    },
    {
        label: "$$$$",
        value: 4
    }
];

const numberOptions = () => {
    const numberList = []
    console.log(numberList);
    for (var i = 1; i < 11; ++i) {
        numberList.push({label: i, value: i})
    }
    return numberList;
}

const defaultValues = {
    brand: '',
    product: '',
    lengthOfUse: '',
    periodOfUse: '',
    reviewText: ''
}

const AddReviewForm = (props) => {
    const methods = useForm({ defaultValues: defaultValues, mode: 'onTouched'});
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    const { handleSubmit, control, setValue, watch } = methods;

    const onSubmit = async (data) => {
        await axios.post(`${window.location.origin.toString()}/product/addNewProductReview`, {
            userName: state.userName,
            productBrand: state.brand,
            productName: state.product,
            lengthOfUse: state.lengthOfUse,
            reviewText: state.review
        })
        .then(
            navigate(`/home`)
        );
    }

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
    return (
        <Card className={classes.card} elevation={10}>
            <CardHeader 
                className={classes.customTitle}
                title={<Typography sx={{ fontWeight: 'bold', fontSize: 18 }} variant={"h6"}>{cardTitle}</Typography>} 
            />
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <FormControl>
            <Grid
                container
                justifyContent={'center'}
                spacing={3}
            >
                <Grid container item xs={8}>
                    <CustomAutocomplete
                            name="brand"
                            label="Brand *"
                            placeholder="Fenty Skin"
                            control={control}
                            options={options}
                    />
                </Grid>
                <Grid container item xs={8}>
                    <CustomInput
                        name="product"
                        label="Product *" 
                        placeholder="Universal Lip Luminizer"
                        control={control}
                        isMultiline={false}
                    />
                </Grid>
                <Grid item container justifyContent={'center'} spacing={3}>
                    <Grid item xs={4}>
                        <CustomSelect
                            name="lengthOfUse"
                            label= "Length Of Use *"
                            options={numberOptions()}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomSelect
                            name="periodOfUse"
                            label="Period Of Use *"
                            options={PeriodOptions}
                            control={control}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={8} rowSpacing={4}>
                    <CustomRadio
                        name="productPrice"
                        label="Estimated Cost *"
                        options={PriceOptions}
                        control={control}
                    />
                </Grid>
                <Grid container item xs={8}>
                    <CustomInput
                        name="reviewText"
                        label="Review Text *" 
                        placeholder="Please provide description of the product"
                        control={control}
                        isMultiline={true}
                    />
                </Grid>
                
                <Grid item container justifyContent={'center'}>
                    <CustomButton id="AddReviewButton" text="Start Discovering Products" type="submit"/>
                </Grid>
            </Grid>
            </FormControl>
            </form>
        </Card>
    );
}

export default withStyles(AddReviewFormStyler)(AddReviewForm);