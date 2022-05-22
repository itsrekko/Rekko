export const InputStyler = (textfieldLabelPosition= "center") => ({
    cssLabel: {
        color: '#A0A5BD',
    },
    cssFocused: {
        bordercolor: 'black',
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
              transformOrigin: "left",
            }
        },
    }
})
