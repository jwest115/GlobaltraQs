import Map from './components/Map/index'
import React, { Component, Fragment } from 'react'
import Header from './components/layout/Header'
import MapDashboard from './components/Map/MapDashboard'
export class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <MapDashboard />
                </div>
            </Fragment>
        )
    }
}

export default App
