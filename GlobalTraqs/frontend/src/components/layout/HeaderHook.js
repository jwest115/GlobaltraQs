import React, { Component, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout} from "../../actions/auth";
import { useSelector, useDispatch, useStore } from "react-redux";
import {editUser} from "../../actions/users";
import IdleTimer from "react-idle-timer";

function Header() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;
    const [anonymousMode, setAnoynmousMode] = useState(false);

    useEffect(() => {
        if(user) {
            setAnoynmousMode(user.is_anonymous_active);
        }
    });
    const idleTimer = useRef(null);
    const onIdle = e => {
        dispatch(logout())
        window.location.replace("http://www.google.com");
    };

    const toggleAnonymous = () => {
        const is_anonymous_active = !anonymousMode;
        console.log("anonymous =....");
        console.log(user.is_anonymous_active);
        const userData = { is_anonymous_active };
        dispatch(editUser(user.id, user.id, userData));
    };

    let accessibilityWidget = document.body.getElementsByClassName("userway")[0];
    console.log("accessibility is");
    console.log(accessibilityWidget);
    if(accessibilityWidget) {
        accessibilityWidget.style.visibility = "hidden";
    }
    let userRole = "";
    let adminManager = null;

    if(user != null) {
           if(user.accessibility_mode_active) {
                if(accessibilityWidget != undefined) {
                    accessibilityWidget.style.visibility = "visible";
                }
           }
           else {
                if(accessibilityWidget != undefined) {
                    accessibilityWidget.style.visibility = "hidden";
                }
           }
           if(user.is_administrator) {
                adminManager = (
                     <li className="nav-item">
                        <Link to="/manage" className="nav-link">Manage</Link>
                     </li>
                );
                userRole = (
                    <strong>(Administrator)</strong>
                );
           }
           else if(user.is_moderator) {
                adminManager = (
                     <li className="nav-item">
                        <Link to="/manage" className="nav-link">Manage</Link>
                     </li>
                );
                userRole = (
                    <strong>(Moderator)</strong>
                );
           }
    }
    else {
        if(accessibilityWidget != undefined) {
            accessibilityWidget.style.visibility = "hidden";
        }
    }
    const authLinks = (
       <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
            <button onClick={toggleAnonymous} className="nav-link btn btn-link btn-lg">
                {anonymousMode ? "Leave Anonymous Mode" : "Go Anonymous"}
            </button>
        </li>
        <span className="navbar-text text-warning mr-5">
          <strong>{user ? `Welcome ${user.is_anonymous_active ? "Anonymous" : user.username}` : ""} {userRole} </strong>
        </span>
        <li className="nav-item">
          <button
            onClick={() => dispatch(logout())}
            className="nav-link btn btn-link btn-lg text-info">
            LOGOUT
          </button>
          </li>
           <li className="nav-item">
          <Link to = {user ? `/users/${user.id}` : " "} className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">GlobaltraQs</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <IdleTimer
                ref={ref => idleTimer.current = ref}
                element={document}
                onIdle={onIdle}
                debounce={250}
                //15 minutes
                timeout={15 * 60 * 1000}
             />

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link to="/faq" className="nav-link">Faq </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/About" className="nav-link">About Us </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/support" className="nav-link">Support Us </Link>
                    </li>
                    {adminManager ? adminManager : ""}
                </ul>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
}
export default Header;