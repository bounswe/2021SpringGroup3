
import RouteList from './routing/RouteList';
import React, { useEffect } from "react";
import 'antd/dist/antd.css';
import './App.css';

import OneSignal from 'react-onesignal';

function App() {

  useEffect(() => {
    OneSignal.init({ appId: process.env.REACT_APP_ONESIGNAL_APP_ID })
  });

  return (
    <>
      <RouteList />
    </>
  );
}

export default App;
