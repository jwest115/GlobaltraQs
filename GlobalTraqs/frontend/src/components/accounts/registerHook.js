import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import Recaptcha from "react-recaptcha";
import * as EmailValidator from "email-validator";

export default function registerHook() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = auth;
  const [userForm, setuserForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    captchaIsVerified: false,
    inputs: {},
    errors: {}
  });
  const [captcha, setcaptcha] = useState(false);
  const reCaptchaLoaded = () => {
    console.log("captcha successfully loaded");
  };
  const verifyCallback = response => {
    if (response) {
      setcaptcha(true);
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    if (captcha) {
      //   const { username, email, password, password2 } = userForm;
      if (formIsValid()) {
        const newUser = {
          username: userForm.username,
          password: userForm.password,
          email: userForm.email
        };
        // this.props.register(newUser);
        dispatch(register(newUser));
      }
    } else {
      alert("please verify that you are a human!");
    }
    // this.formIsValid();
  };
  const formIsValid = () => {
    let errors = {};
    let formIsValid = true;
    if (userForm.username === "") {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }
    if (userForm.username !== "") {
      errors["username"] = "";
    }
    if (userForm.password !== "") {
      errors["password"] = "";
    }
    if (userForm.password.length < 8) {
      formIsValid = false;
      errors["password"] = "*Password must be at least 8 characters long";
    }
    if (!userForm.password === "") {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    if (userForm.email === "") {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (userForm.email !== "") {
      errors["email"] = "";
    }
    if (!EmailValidator.validate(userForm.email)) {
      formIsValid = false;
      errors["email"] = "*Please enter a valid email";
    }
    if (userForm.password !== userForm.password2) {
      formIsValid = false;
      errors["password2"] = "*Passwords do not Match";
    }
    if (userForm.password === userForm.password2) {
      errors["password2"] = null;
    }
    if (userForm.password.search(/[!@#$%^&*_+()]/) === -1) {
      formIsValid = false;
      errors["password"] =
        "*Password must contain a special character like: !@#$%^&*)(_+";
    }
    if (userForm.password.search(/\d/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain at least 1 number";
    }
    if (userForm.password.search(/[a-zA-Z]/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain a Letter";
    }
    setuserForm({
      ...userForm,
      errors: errors
    });
    // this.setState({ errors: errors });
    return formIsValid;
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={e =>
                setuserForm({
                  ...userForm,
                  username: e.target.value
                })
              }
              value={userForm.username}
            />
            <div name="userStatus" />
            <p className="text-danger">{userForm.errors["username"]}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={e =>
                setuserForm({
                  ...userForm,
                  email: e.target.value
                })
              }
              value={userForm.email}
            />
            <div id="emailStatus" />
            <p className="text-danger">{userForm.errors["email"]}</p>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={e =>
                setuserForm({
                  ...userForm,
                  password: e.target.value
                })
              }
              value={userForm.password}
            />
            <p className="text-danger">{userForm.errors["password"]}</p>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={e =>
                setuserForm({
                  ...userForm,
                  password2: e.target.value
                })
              }
              value={userForm.password2}
            />
            <p className="text-danger">{userForm.errors["password2"]}</p>
          </div>
          <div className="form-group row justify-content-between justify-content-around">
            <button type="submit" className="btn btn-primary float-left">
              Register
            </button>
            {/*This is the ReCaptcha*/}
            <Recaptcha
              className="float-right"
              sitekey="6LcAL78UAAAAAPOluo3jzUzXt5XLWKuUujc-_7QX"
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={reCaptchaLoaded}
            />
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
