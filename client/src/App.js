import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/layout/Landing';
import Landingv2 from './components/layout/Landingv2';
import Landingv3 from './components/static/Landingv3';
import NotFound404 from './components/static/NotFound404';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Explore from './components/explore/ExploreTasks';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Forgot from './components/auth/Forgot';
import AddTask from './components/task/AddTask';
import UserInfo from './components/profile/UserInfo';
import UserProfileNew from './components/profile/steps/UserProfileNew';
import Header from './components/layout/Header';
import Messages from './components/message/Messages';
import Me from './components/profile/Me';
import userDetail from './components/viewProfile/UserDetails';
import Notifications from './components/notifications/Notifications';
import Footer from './components/layout/Footer';
import MyTasks from './components/task/MyTasks';
import MyWork from './components/task/MyWork';
import TaskMain from './components/task/TaskMain';
import EditTask from './components/task/EditTask';
import Settings from './components/settings/Settings';
import Work from './components/Work/Work';

import Admin from './components/admin/Admin';
import AdminUsers from './components/admin/AdminUsers';
import AdminActivities from './components/admin/AdminActivities';
import AdminTasks from './components/admin/AdminTasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/header.css';
import PrivacyPolicy from './components/static/PrivacyPolicy';
import AdminRoute from './components/admin/AdminRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

if (localStorage.darkTheme) {
  require('./style/darktheme.css');
  document.getElementById('body').className = 'darktheme';
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className='App'>
            <Header />
            <Switch>
              <Route exact path='/' component={Landingv3} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgot' component={Forgot} />
              <Route exact path='/landing' component={Landing} />
              <Route exact path='/UserInfo' component={UserInfo} />
              <Route exact path='/user-new' component={UserProfileNew} />
              <Route exact path='/t/:id' component={TaskMain} />
              <Route exact path='/privacy-policy' component={PrivacyPolicy} />
              <Route exact path='/404' component={NotFound404} />

              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/add' component={AddTask} />
              <PrivateRoute exact path='/explore' component={Explore} />
              {/* <PrivateRoute path='/messages' component={Messages}>
                <PrivateRoute path='/messages/:id' component={Messages} />
              </PrivateRoute> */}
              <PrivateRoute exact path='/messages' component={Messages} />
              <PrivateRoute exact path='/messages/:id' component={Messages} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute
                exact
                path='/notifications'
                component={Notifications}
              />
              <PrivateRoute exact path='/me' component={Me} />
              <PrivateRoute exact path='/mytasks' component={MyTasks} />
              <PrivateRoute exact path='/mywork' component={MyWork} />
              <PrivateRoute exact path='/u/:id' component={userDetail} />
              <PrivateRoute exact path='/w/:id' component={Work} />
              <PrivateRoute exact path='/e/:id' component={EditTask} />

              <AdminRoute exact path='/admin' component={Admin} />
              <AdminRoute exact path='/admin/users' component={AdminUsers} />
              <AdminRoute
                exact
                path='/admin/activity'
                component={AdminActivities}
              />
              <AdminRoute exact path='/admin/tasks' component={AdminTasks} />
              <Route path='*' component={NotFound404} />
            </Switch>

            <ToastContainer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
