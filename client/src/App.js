import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import GlobalStateProvider from './context/GlobalState';
import * as ROUTES from './utils/routeNames';
import ReactLoader from './components/ReactLoader';

const Login = lazy(() => import('./pages/Login'));
const WelcomeUser = lazy(() => import('./pages/WelcomeUser'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poiret One',
      'Regular 400',
    ].join(','),
  },});

const App = () => {

  return (
    <div className="App">
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <GlobalStateProvider>
      <Router>
        <Suspense fallback={<ReactLoader />}>
        <Routes>
            <Route path = {ROUTES.LOGIN} element={<Home />} />
            <Route path = {ROUTES.WELCOME} element={
              <WelcomeUser cardTitle={'What’s a beauty product you can’t live without at the moment?'} buttonText={'Start discovering products'}/>}
            />
            <Route path = {ROUTES.REVIEW} element={
              <WelcomeUser cardTitle='Share another product you love' buttonText={'Keep discovering products'}/>}
            />
            <Route path = {ROUTES.HOME} element={<Home />} />
            <Route path = {ROUTES.NOT_FOUND} element={<NotFound/>} />
        </Routes>
        </Suspense>
      </Router>
      </GlobalStateProvider>
      </ThemeProvider>
    </StyledEngineProvider>
    </div>
  );
}

export default App;