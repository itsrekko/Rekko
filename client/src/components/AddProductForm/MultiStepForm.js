import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';
import ProductInfoForm from './ProductInfoForm';
import ProductDescription from './ProductDescription';
import ProductImageUploaderForm from './ProductImageUploaderForm';

const steps = [' Account Details', 'Personal Info', 'Review and Submit'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const testSubmit = async (formValues) => {
    console.log('We are on handleSubmit')
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formValues)
    };
    const url = "/api/authenticate";
    try {
      const response = await fetch(url, options);
      const text = await response.text();

    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      productType: '',
      brand: '',
      productName: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      productType: Yup.string()
        .required('Product Type is required'),
      brand: Yup.string()
        .required('Product Brand is required'),
      productName: Yup.string()
        .required('Product Name is required'),
      description: Yup.string()
        .required('Product Name is required'),
    }),
    onSubmit: values => {
      console.log("We are on submit values")
    }
  });

  const formContent = (step) => {
    switch(step) {
      case 0:
        return <ProductInfoForm formik={formik} />;
      case 1:
        return <ProductDescription formik={formik} />;
      case 2:
        return <ProductImageUploaderForm formik={formik} />;
      default:
        return <div>404: Not Found</div>
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        padding: 2
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
      sx={{
        maxWidth: '600px',
        padding: 2
      }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Box>
              {formContent(activeStep)}
            </Box>
            {formik.errors.submit && (
              <Box>
                <FormHelperText error>
                  {formik.errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button type="submit">
                  Submit
                </Button>
              ) : (
                <Button disabled={activeStep === steps.length - 1} onClick={handleNext}>
                  Next
                </Button>
              ) }
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Form;