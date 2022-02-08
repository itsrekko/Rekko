import {Typography} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import PoiretOne from 'typeface-poiret-one'

const theme = createTheme({
  typography: {
    fontFamily: '"PoiretOne", cursive',
    fontSize: '35px',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: ${PoiretOne};
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

export const Title = () => {
    return(
        <ThemeProvider theme={theme}>
            <Typography style={{
                color: '#000000',
                fontWeight: 400,
                lineHeight: '40.95px'
            }}>REKKO</Typography>
        </ThemeProvider>
    );
}