
import React, { Component, Fragment } from 'react';
import Header from './components/layout/Header';
import MapDashboard from './components/Map/MapDashboard';
import About from './components/AboutPage/About';
import FAQ from './components/AboutPage/FAQ';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import register from './components/accounts/register';
// if deployed to apache, mess with congig htt file
import Alerts from "./components/layout/Alerts";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from 'react-redux';
import store from './store';
import login from './components/accounts/login';
import PrivateRoute from './components/common/PrivateRoute';
import { loadUser } from './actions/auth';
import Story from './components/Map/Story'
import {DisplayMap} from "./components/Map/DisplayMap";
import Manage from './components/accounts/manage'


export class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                           <div className="container">
                            <Switch>

                                <Route exact path="/" component={MapDashboard} />
                                <Route exact path="/About" component={About} />
                                <Route path='/Story/:id' exact component={Story} />
                                <Route exact path="/faq" component={FAQ} />
                                <Route exact path="/login" component={login} />
                                <Route exact path="/register" component={register} />
                                <Route exact path="/manage" component={Manage} />
                                {/* <MapDashboard /> */}
                            </Switch>
                          </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default App
