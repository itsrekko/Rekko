import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import React from 'react';
import {InitializeAmplify} from './auth/api/amplify-client';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import WelcomeUser from './pages/WelcomeUser';
import Home from './pages/Home';
import GlobalStateProvider from './context/GlobalState';
import SignUp from './pages/SignUp';
import VerifyCode from './pages/VerifyCode';

const theme = createTheme(adaptV4Theme({
  typography: {
    fontFamily: [
      'Poiret One',
      'Regular 400',
    ].join(','),
  },}));

// Initialize Auth
InitializeAmplify();

const App = () => {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <GlobalStateProvider>
      <Router>
        <div className="App">
        <Routes>
            <Route path = "/" exact element={<SignUp />} />
            <Route path = "/verify" exact element={<VerifyCode/>} />
            <Route path = "/login" exact element={<Login />} />
            <Route path = "/welcome" element={<WelcomeUser cardTitle={'What’s a beauty product you can’t live without at the moment?'} buttonText={'Start discovering products'}/>} />
            <Route path = "/review" element={<WelcomeUser cardTitle='Share another product you love' buttonText={'Keep discovering products'}/>} />
            <Route path = "/home/:userName" element={<Home />} />
        </Routes>
        </div>
      </Router>
      </GlobalStateProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;