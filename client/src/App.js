import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddEducation from "./components/profile-forms/AddEducation";
import Profile from "./components/my-profile/Profile";
import UserProfile from "./components/profiles/UserProfile";
import Profiles from "./components/profiles/Profiles";
import ConnectionRequests from "./components/my-profile/ConnectionRequests";
import SentInvitations from "./components/my-profile/SentInvitations";
import UserConnections from "./components/my-profile/UserConnections";
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Posts from "./components/posts/Posts";
import Alert from "./components/layout/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />

          <section className="bg-light-gray">
            <Alert />

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/my-profile" component={Profile} />

              <PrivateRoute
                exact
                path="/my-requests"
                component={ConnectionRequests}
              />
              <PrivateRoute
                exact
                path="/sent-invitations"
                component={SentInvitations}
              />

              <PrivateRoute exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/profile/:id" component={UserProfile} />
              <PrivateRoute
                exact
                path="/user/connections"
                component={UserConnections}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
