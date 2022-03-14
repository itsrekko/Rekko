const LoginFormStyler = (textfieldLabelPosition= "center") => ({
    container: {
      marginTop: '25px',
      display: 'grid',
      flexWrap: 'wrap',
    },
    button: {
      "&.MuiButton-root": {
        backgroundColor: '#6C5B57',
        width: "710px",
        "@media (max-width: 768px)": { width: "78vw" },
        outerHeight: '30px',
        borderRadius: '25px',
        '&:hover': {
          backgroundColor: '#5e4f4b',
        }
      },
      "&.MuiButton-sizeLarge": "56px"
    },
    textField: {
      backgroundColor: '#F5F5F7',
      width: "710px",
      "@media (max-width: 768px)": { width: "78vw" }, 
      borderRadius: '25px',
      "& label": {
        width: "100%",
        textAlign: textfieldLabelPosition,
        transformOrigin: textfieldLabelPosition,
          "&.Mui-focused": {
            transformOrigin: textfieldLabelPosition
          }
       }
    },

    searchTextField: {
      backgroundColor: '#F5F5F7',
      width: "500px",
      "@media (max-width: 768px)": { width: "69vw" }, 
      borderRadius: '25px',
      "& label": {
        width: "100%",
        textAlign: textfieldLabelPosition,
        transformOrigin: textfieldLabelPosition,
          "&.Mui-focused": {
            transformOrigin: textfieldLabelPosition
          }
       }
    },
  
    cssLabel: {
      color: '#A0A5BD',
    },
  
    
    notchedOutline: {
      borderRadius: '25px',
      borderWidth: '0px',
      borderColor: '#F5F5F7 !important',
    },
  });

export default LoginFormStyler