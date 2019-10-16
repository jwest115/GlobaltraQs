import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return (
            <div className="top-bar">
                <a href = "/frontend"><img src="../static/frontend/images/globaltraqs logo.png" alt="logo"></img></a>
                <div className="navigation-links">
                    <a href="">SEARCH</a>
                    <a href='/login'>SIGN UP/LOG IN</a>
                </div>
            </div>
        )
    }
}

export default Header;