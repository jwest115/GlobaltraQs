import Map from './components/Map/index'
import React, { Component, Fragment } from 'react'
import Header from './components/layout/Header'
import MapDashboard from './components/Map/MapDashboard'

const divStyle = {
    height: '400px',
    width: '100%'

}

export class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container" style={divStyle}>
                    <MapDashboard />
                </div>
            </Fragment>
        )
    }
}

export default App
