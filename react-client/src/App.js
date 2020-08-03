import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProtectedRoute from './authentication/ProtectedRoute';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import "jquery/dist/jquery.min.js";

import './reflex.css';
import './App.scss';
// Page Level Component
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/StudentProfile/SignIn';
import SignUp from './components/StudentProfile/SignUp';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import StudentProfile from './components/StudentProfile/StudentProfile';
import Curriculum from './components/Curriculum/Curriculum';
import Subscription from './components/Subscription/';
import Payment from './components/Payment/';
import ForgotPassword from "./components/StudentProfile/ForgotPassword";
import ChangePassword from "./components/StudentProfile/ChangePassword";
import InstructorDashboard from './components/InstructorDashboard/InstructorDashboard';
import CreateProject from './components/InstructorDashboard/CreateProject';
import ProjectCurriculum from './components/InstructorDashboard/ProjectCurriculum';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
				<Route exact path="/changepassword" component={ChangePassword}/>
        <Route exact path="/instructor/dashboard" component={InstructorDashboard} />
        <Route exact path="/instructor/createproject" component={CreateProject} />
        <Route exact path="/instructor/curriculum/:projectID/:projectTitle" component={ProjectCurriculum} />
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
