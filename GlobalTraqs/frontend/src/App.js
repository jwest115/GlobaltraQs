
import React, { Component, Fragment } from 'react'
import Header from './components/layout/Header'
import MapDashboard from './components/Map/MapDashboard'
import About from './components/AboutPage/About'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <div className="container">
                        <MapDashboard />

                    </div>
                </Fragment>
            </Provider>
        )
    }
}

export default App
