
const inputStyler = () => ({
    cssLabel: {
        color: '#A0A5BD',
    }, 
    cssFocused: {
        color: 'black',
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
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#F5F5F7 !important`,
          borderRadius: '25px',
          borderWidth: '0px',
        },
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: '#F5F5F7 !important',
    }
})