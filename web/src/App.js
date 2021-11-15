
import RouteList from './routing/RouteList';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import Post from './components/Post';
import ProfileEdit from './components/ProfileEdit';
import ProfileView from './components/ProfileView';
import React from "react";
import 'antd/dist/antd.css';
import './App.css';
import { useState, Image } from 'react';

import moment from 'moment' ;

function App() {

  let userObj = {
    username: 'Ufuk',
    profilePicture: 'https://avatars.githubusercontent.com/u/39625217?s=96&v=4',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    birthday: moment('11/11/2011'),
    location: 'istanbul',
    isProfilePicturePublic: true,
    isBioPublic: true,
    isBirthdayPublic: false,
    isLocationPublic: false,
    isProfilePublic: true
  }

  //   let userObj = {
  //   id: 1,
  //   username: 'Ufuk',
  //   profilePicture: 'https://avatars.githubusercontent.com/u/39625217?s=96&v=4',
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   birthday: '11/11/2011',
  //   location: 'istanbul',
  //   isProfilePicturePublic: true,
  //   isBioPublic: true,
  //   isBirthdayPublic: false,
  //   isLocationPublic: false,
  //   isProfilePublic: true,
  //   followerCount: 100,
  //   postCount: 10,
  //   isFollowing: true
  // }

  return (
    <>
      <RouteList />
    </>
  );
}

export default App;
