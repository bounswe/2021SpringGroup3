/* eslint-disable no-debugger */
import React from 'react';
import {
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function AuthRoute({ children }) {
  const {  isAuthenticated } = useSelector((state) => state.login);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
