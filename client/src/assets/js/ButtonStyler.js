export const ButtonStyler = () => ({
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
    }
})