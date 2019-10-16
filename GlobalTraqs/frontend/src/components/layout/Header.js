import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
export class Header extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">GlobalTraqs</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>

                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/faq" className="nav-link">Faq </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-link">About </Link>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Header
