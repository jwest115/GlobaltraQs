import React, { Component, Fragment } from "react";
import Header from "./components/layout/Header";
import MapDashboard from "./components/Map/MapDashboard";
import About from "./components/Pages/About";
import FAQ from "./components/Pages/FAQ";
import Resources from "./components/Pages/Resources";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import register from "./components/accounts/Register";
// if deployed to apache, mess with congig htt file
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import store from "./store";
import login from "./components/accounts/Login";
import PrivateUserRoute from "./components/common/PrivateUserRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";

import Manage from "./components/AdminMod/Manage";
import ProfilePage from "./components/profile/ProfilePage";
import Settings from "./components/profile/ProfileSettings";

import ForgotPassword from "./components/accounts/ForgotPassword";
import Support from "./components/Pages/Support";
import ResetPassword from "./components/accounts/ResetPassword";
import ContactUs from "./components/Pages/ContactUs";
import ProfileDashboard from "./components/profile/ProfileDashboard";
const divStyle = {
  position: "relative",
};

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div>
              {/*<div className="container-fluid" style={divStyle}>*/}
              <Switch>
                <Route exact path="/" component={MapDashboard} />
                <Route exact path="/story" component={MapDashboard} />
                <Route exact path="/story/:id" component={MapDashboard} />
                <Route exact path="/About" component={About} />
                <Route exact path="/resources" component={Resources} />
                {/*<Route path="/Story/:id" exact component={Story} />*/}
                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/login" component={login} />
                <Route exact path="/register" component={register} />
                <Route exact path="/users/:name" component={ProfileDashboard} />
                <Route exact path="/users/:id/settings" component={Settings} />
                <Route exact path="/users" component={ProfileDashboard} />
                <PrivateRoute exact path="/manage" component={Manage} />
                <PrivateRoute exact path="/manage/flag" component={Manage} />
                <PrivateRoute exact path="/manage/users" component={Manage} />
                <PrivateRoute
                  exact
                  path="/manage/comments"
                  component={Manage}
                />

                <Route
                  exact
                  path="/profile/:name"
                  component={ProfileDashboard}
                />
                <Route exact path="/profile" component={ProfileDashboard} />

                <Route exact path="/test" component={ProfileDashboard} />
                <Route exact path="/test/:lit" component={ProfileDashboard} />
                {/*<Route path="/Story/:id/edit" exact component={EditStory} />*/}
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/resetPassword" component={ResetPassword} />
                <Route path="/Support" component={Support} />
                <Route path="/ContactUs" component={ContactUs} />
                {/* <MapDashboard /> */}
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
