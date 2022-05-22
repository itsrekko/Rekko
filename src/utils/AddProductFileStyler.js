const AddProductFileStyler = () => ({
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
        marginTop: '8vh',
        height: "fitContent",
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
});

export default AddProductFileStyler;