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
  
    cssLabel: {
      color: '#A0A5BD',
    },
  
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: `#F5F5F7 !important`,
        borderRadius: '25px',
      },
    },
  
    cssFocused: {
      color: 'black',
    },
  
    notchedOutline: {
      borderRadius: '25px',
      borderWidth: '1px',
      borderColor: '#F5F5F7 !important',
    },
  });

export default LoginFormStyler