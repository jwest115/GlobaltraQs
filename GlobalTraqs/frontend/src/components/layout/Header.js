import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useSelector, useDispatch, useStore } from "react-redux";
import { editUser } from "../../actions/users";
import IdleTimer from "react-idle-timer";
import Image from "react-bootstrap/Image";
import logo from "./images/thearqive_white_color_logos.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const idleTimer = useRef(null);
  const onIdle = (e) => {
    dispatch(logout());
    window.location.replace("http://www.google.com");
  };

  const toggleAnonymous = () => {
    const is_anonymous_active = !user.is_anonymous_active;

    const userData = { is_anonymous_active };
    dispatch(editUser(user.id, user.id, userData));
  };

  let accessibilityWidget = document.body.getElementsByClassName("userway")[0];

  if (accessibilityWidget) {
    accessibilityWidget.style.visibility = "hidden";
  }
  let userRole = "";
  let adminManager = null;
  let actual_username = "";
  if (user != null) {
    if (actual_username == "") {
      actual_username = user.username;
    }

    if (user.accessibility_mode_active) {
      if (accessibilityWidget != undefined) {
        accessibilityWidget.style.visibility = "visible";
      }
    } else {
      if (accessibilityWidget != undefined) {
        accessibilityWidget.style.visibility = "hidden";
      }
    }
    if (user.is_administrator) {
      adminManager = (
        <li className="nav-item">
          <Link to="/manage" className="nav-link header-dropdown-nav-item">
            Management
          </Link>
        </li>
      );
      userRole = <strong>(Administrator)</strong>;
    } else if (user.is_moderator) {
      adminManager = (
        <li className="nav-item">
          <Link to="/manage" className="nav-link header-dropdown-nav-item">
            Manage
          </Link>
        </li>
      );
      userRole = <strong>(Moderator)</strong>;
    }
  } else {
    if (accessibilityWidget != undefined) {
      accessibilityWidget.style.visibility = "hidden";
    }
  }
  const authLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item anonymous-nav-item">
        <button
          onClick={toggleAnonymous}
          className="header-nav-anonymous nav-link btn btn-link btn-lg"
        >
          {isAuthenticated && user.is_anonymous_active ? (
            <p className="header-nav-anonymous-active nav">Anonymous</p>
          ) : (
            <p className="header-nav-anonymous nav">Go Anonymous</p>
          )}
        </button>
      </li>
      <li className="nav-item dropdown-nav">
        <Dropdown
          className="header-dropdown"
          outline
          isOpen={isDropdownOpen}
          nav={true}
          toggle={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <DropdownToggle
            caret
            className="header-user-dropdown-button header-nav-username"
          >
            {user
              ? `Welcome ${
                  user.is_anonymous_active ? "Anonymous" : user.username
                }`
              : ""}{" "}
            {userRole}{" "}
          </DropdownToggle>
          <DropdownMenu className="header-user-dropdown-menu">
            <DropdownItem>
              <Link
                to={user ? `/users/${actual_username}` : " "}
                className="nav-link header-dropdown-nav-item"
              >
                Profile
              </Link>
            </DropdownItem>
            {adminManager ? <DropdownItem>{adminManager}</DropdownItem> : ""}
            <DropdownItem>
              <li className="nav-item">
                <button
                  onClick={() => dispatch(logout())}
                  className="nav-link btn btn-link header-dropdown-nav-item"
                >
                  Logout
                </button>
              </li>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <Link to="/register" className="nav-link header-nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link header-nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="site-header fixed-top navbar navbar-expand-lg navbar-dark header-nav">
      <a className="navbar-brand" href="#">
        <Image src={logo} height={"108px"} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <IdleTimer
        ref={(ref) => (idleTimer.current = ref)}
        element={document}
        onIdle={onIdle}
        debounce={250}
        //15 minutes
        timeout={15 * 60 * 1000}
      />

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              to="/faq"
              className="nav-link header-nav-link faq-header-nav-link"
            >
              Faq
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/About"
              className="nav-link header-nav-link about-us-header-nav-link"
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/support"
              className="nav-link header-nav-link support-us-nav-link"
            >
              Support Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/resources"
              className="nav-link header-nav-link resources-nav-link"
            >
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ContactUs"
              className="nav-link header-nav-link contact-us-nav-link"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
}
export default Header;
