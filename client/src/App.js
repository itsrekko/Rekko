import React from "react";

import { ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import GlobalStateProvider from './context/UserContext';
import * as ROUTES from './utils/routeNames';
import ReactLoader from './components/ReactLoader';
import ProfilePage from './pages/Profile';
import ProductPage from './pages/ProductPage';
import AddProductForm from './pages/AddProductForm';
import PostPage from './pages/PostPage';
import PostModal from "./components/Post/PostModal";
import Theme from './theme/Theme';

import './App.css';

const Login = lazy(() => import('./pages/Login'));
const WelcomeUser = lazy(() => import('./pages/WelcomeUser'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {

  // const location = useLocation();
  // const prevLocation = React.useRef(location);
  // const modal = location.state?.modal;

  // React.useEffect(() => {
  //   if (!modal) {
  //     prevLocation.current = location;
  //   }
  // }, [location, modal]);

  // const isModalOpen = modal && prevLocation.current !== location;

  return (
    <ThemeProvider theme={Theme}>
      <Box className="App">
      <StyledEngineProvider injectFirst>
        <GlobalStateProvider>
        <Router>
          <Suspense fallback={<ReactLoader />}>
          <Routes>
              <Route path = {ROUTES.LOGIN} element={<Home />} />
              <Route path = {ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path = {ROUTES.WELCOME} element={
                <WelcomeUser cardTitle={'What’s a beauty product you can’t live without at the moment?'} buttonText={'Start discovering products'}/>}
              />
              <Route path = {ROUTES.POST} element={<PostPage />} />
              <Route path = {ROUTES.PRODUCT} element={<ProductPage />} />
              <Route path = {ROUTES.ADDPRODUCT} element={<AddProductForm />} />
              <Route path = {ROUTES.REVIEW} element={
                <WelcomeUser cardTitle='Share another product you love' buttonText={'Keep discovering products'}/>}
              />
              <Route path = {ROUTES.NOT_FOUND} element={<NotFound/>} />
          </Routes>
            
          </Suspense>
        </Router>
        </GlobalStateProvider>
      </StyledEngineProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;