import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import ProductImageGallery from "../components/Product/ProductImageGallery/ProductImageGallery";
import ProductInformationContainer from "../components/Product/ProductInformationContainer";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const ProductPage = (props) => {

    console.log(props, props.id)
      
    const useStyles = makeStyles(() => ({
      productPageContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      },
      productImage: {
        boxSizing: 'border-box',
        padding: '1rem',
        width: '420px',
        marginLeft: '7%',
        marginTop: '1rem',
        alignItems: 'flex-end',
      },
      productInformation: {
        width: '100%',
        marginLeft: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: '2rem'
      },
    }));
    const classes = useStyles();

    return (
      <Box className={classes.productPageContainer}>
        <Box className={classes.productImage}>
          <ProductImageGallery />
        </Box>
        <Box className={classes.productInformation}>
          <ProductInformationContainer />
        </Box>
      </Box>
    );
  }
  
  export default ProductPage;