
import React, { Component, Fragment } from 'react'
import Header from './components/layout/Header'
import MapDashboard from './components/Map/MapDashboard'
import About from './components/AboutPage/About'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const divStyle = {
    height: '400px',
    width: '100%'

}

export class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <div className="container" style={divStyle}>

                        <Route path="/" component={MapDashboard} />
                        <Route path="/about" component={About} />
                    </div>
                </Fragment>
            </Router>
        )
    }
}

export default App
