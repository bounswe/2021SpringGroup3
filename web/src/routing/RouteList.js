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
import CreatePostTypePage from '../pages/CreatePostTypePage';
import CreatePostPage from '../pages/CreatePostPage';
import GetCommunityPage from '../pages/GetCommunityPage';
import GetPostPage from '../pages/GetPostPage';
import ProfilePage from '../pages/ProfilePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import NotificationsPage from '../pages/NotificationsPage';

export default function RouteList() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/login" exact element={<PublicRoute><LoginPage/></PublicRoute>} />
        <Route path="/register" exact element={<PublicRoute><RegistrationPage/></PublicRoute>} />
        <Route path="/confirmation" exact element={<PublicRoute><ConfirmationPage/></PublicRoute>} />
        <Route path="/home" exact element={<AuthRoute><HomePage/></AuthRoute>} />
        <Route path="/leftCommunity/:id" element={<AuthRoute><HomePage /></AuthRoute>} />
        <Route path="/createCommunity" exact element={<AuthRoute><CreateCommunityPage /></AuthRoute>} />
        <Route path="/createPostType" exact element={<AuthRoute><CreatePostTypePage /></AuthRoute>} />
        <Route path="/createPost" element={<AuthRoute><CreatePostPage /></AuthRoute>} />
        <Route path="/createPost/community/:communityId" element={<AuthRoute><CreatePostPage /></AuthRoute>} />
        <Route path="/communities/:communityId/posts/:postId" element={<AuthRoute><GetPostPage /></AuthRoute>} />
        <Route path="/communities/:id" element={<AuthRoute><GetCommunityPage /></AuthRoute>} />
        <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
        <Route path="/profile/edit" element={<AuthRoute><ProfileEditPage/></AuthRoute>} />
        <Route path="/profiles/:id" element={<AuthRoute><ProfilePage /></AuthRoute>} />
        <Route path="/notifications" element={<AuthRoute><NotificationsPage /></AuthRoute>} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
