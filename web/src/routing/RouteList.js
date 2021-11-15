import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import HomePage from '../pages/HomePage';
import history from '../history';
import PublicRoute from './PublicRoute';
import AuthRoute from "./AuthRoute";
import CreateCommunityPage from '../pages/CreateCommunityPage';


export default function RouteList() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/login" exact element={<PublicRoute><LoginPage/></PublicRoute>} />
        <Route path="/register" exact element={<PublicRoute><RegistrationPage/></PublicRoute>} />
        <Route path="/confirmation" exact element={<PublicRoute><ConfirmationPage/></PublicRoute>} />
        <Route path="/home" exact element={<AuthRoute><HomePage/></AuthRoute>} />
        <Route path="/createCommunity" exact element={<AuthRoute><CreateCommunityPage /></AuthRoute>} />
        <Route path="/communities/:id" element={<AuthRoute><CreateCommunityPage /></AuthRoute>} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
