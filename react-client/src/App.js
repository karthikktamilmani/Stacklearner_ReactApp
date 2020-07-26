import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './authentication/ProtectedRoute';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import "jquery/dist/jquery.min.js";

import './reflex.css';
import './App.scss';

// Page Level Components
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/StudentProfile/SignIn';
import SignUp from './components/StudentProfile/SignUp';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import StudentProfile from './components/StudentProfile/StudentProfile';
import Curriculum from './components/Curriculum/Curriculum';
import Subscription from './components/Subscription/';
import Payment from './components/Payment/';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute>
          <Route exact path="/student/dashboard" component={StudentDashboard} />
          <Route exact path="/student/profile" component={StudentProfile} />
          <Route exact path="/student/projects/:projectID" component={Curriculum} />
          <Route path="/subscription" exact component={Subscription} />
          <Route path="/payment-settings" exact component={Payment} />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
