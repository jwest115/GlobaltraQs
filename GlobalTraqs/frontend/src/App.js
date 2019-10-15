
import React, { Component, Fragment } from 'react'
import Header from './components/layout/Header'
import MapDashboard from './components/Map/MapDashboard'
import About from './components/AboutPage/About'
import FAQ from './components/AboutPage/FAQ'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import register from './components/accounts/register'
// if deployed to apache, mess with congig htt file
import { Provider } from 'react-redux'
import store from './store';
import login from './components/accounts/login'

export class App extends Component {
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
                                <Route exact path="/faq" component={FAQ} />
                                <Route exact path="/login" component={login} />
                                <Route exact path="/register" component={register} />
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
