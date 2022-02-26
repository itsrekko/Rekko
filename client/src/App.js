import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import WelcomeUser from './pages/WelcomeUser';
import Home from './pages/Home';
import GlobalStateProvider from './context/GlobalState';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poiret One',
      'Regular 400',
    ].join(','),
  },});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <GlobalStateProvider>
    <Router>
      <div className="App">
      <Routes>
          <Route path = "/" exact element={<Login />} />
          <Route path = "/welcome" element={<WelcomeUser cardTitle={'What’s a beauty product you can’t live without at the moment?'} buttonText={'Start discovering products'}/>} />
          <Route path = "/review" element={<WelcomeUser cardTitle='Share another product you love' buttonText={'Keep discovering products'}/>} />
          <Route path = "/home/:userName" element={<Home />} />
      </Routes>
      </div>
    </Router>
    </GlobalStateProvider>
    </ThemeProvider>
    
  );
}

export default App;