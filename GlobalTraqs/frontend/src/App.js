import React, { Component, Fragment } from "react";
import Header from "./components/layout/HeaderHook";
import MapDashboard from "./components/Map/MapDashboard";
import About from "./components/AboutPage/About";
import FAQ from "./components/AboutPage/FAQ";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import register from "./components/accounts/register";
// if deployed to apache, mess with congig htt file
import Alerts from "./components/layout/Alerts";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import store from "./store";
import login from "./components/accounts/login";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";
import Story from "./components/Map/StoryTest";
import { DisplayMap } from "./components/Map/DisplayMap";
import Manage from "./components/AdminMod/Manage";
import ManageUsers from "./components/AdminMod/ManageUsers";
import ProfilePage from "./components/profile/ProfilePageHooks";
import Settings from "./components/profile/SettingsHooks";
import EditStory from "./components/Map/EditStory";
import ManageFlag from "./components/AdminMod/ManageFlag";
import ForgotPassword from "./components/accounts/ForgotPassword";
import MainStory from "./components/Map/Story/MainStory";
import AddComment from "./components/Map/AddComment";
import PinForm from "./components/Map/PinForm";
import Support from "./components/AboutPage/Support";
import ResetPassword from "./components/accounts/resetPassword";
const divStyle = {
  position: "relative"
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
                {/*<Route path="/Story/:id" exact component={Story} />*/}
                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/login" component={login} />
                <Route exact path="/register" component={register} />
                <Route exact path="/users/:id" component={ProfilePage} />
                <Route exact path="/users/:id/settings" component={Settings} />
                <PrivateRoute exact path="/manage" component={Manage} />
                <PrivateRoute exact path="/manage/flag" component={Manage} />
                <PrivateRoute exact path="/manage/users" component={Manage} />
                {/*<Route path="/Story/:id/edit" exact component={EditStory} />*/}
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/resetPassword" component={ResetPassword} />
                <Route path="/Support" component={Support} />
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
