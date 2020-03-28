import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import Recaptcha from "react-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


export default function Login() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, user, loginFail } = auth;
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const [submitted, setSubmitted] = useState(false);
  const [userForm, setuserForm] = useState({
    username: "",
    password: "",
    captchaIsVerified: false,
    counter: 0,
    errors: {}
  });
  const [attempts, setattempts] = useState(false);

  const reCaptchaLoaded = () => {
    console.log("captcha successfully loaded");
  };
  const verifyCallback = response => {
    if (response) {
      setuserForm({
        ...userForm,
        captchaIsVerified: !userForm.captchaIsVerified
      });
    }
  };
  const validateForm = () => {
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
    if (userForm.password === "") {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    console.log("user form attempts is set to");
    console.log(attempts);
    setuserForm({
      ...userForm,
      errors: errors
    });
    return formIsValid;
  };

  const submitForm = e => {
    setuserForm({
      ...userForm,
      counter: userForm.counter++
    });
    console.log("initial: " + userForm.counter);
    if (userForm.counter < 3) {
      e.preventDefault();
      dispatch(login(userForm.username, userForm.password));
      setSubmitted(true);
      console.log("no captcha: " + userForm.counter);
    } else {
      e.preventDefault();
      console.log("it went thru");
      setattempts(true);
      console.log("set it to true");
      if (userForm.captchaIsVerified) {
        e.preventDefault();
        console.log("With captcha: " + userForm.counter);
        dispatch(login(userForm.username, userForm.password));
        setSubmitted(true);
      } else {
        e.preventDefault();
        alert("please verify that you are a human!");
      }
    }
    validateForm();
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
   <div className={"main-content-div"}>
    <div className="col-md-6 m-auto">
      {console.log(attempts)}
      {/* if form was submitted and login failed then show an error banner*/}

      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        {submitted && loginFail ?
          <div className="card card-body mt-5 alert alert-danger" role="alert">
          Login Failed.
          </div>
          :
          ""
        }
        <form onSubmit={submitForm}>
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
            <p className="text-danger">{userForm.errors["username"]}</p>
          </div>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              placement="bottom-start"
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Must be at least eight characters with one Uppercase, Lowercase, Number, and Special Character."
            >
              <div className="form-group">
                <label>Password</label>
                <input
                  onClick={handleTooltipOpen}
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
                <p className="text-danger">{userForm.errors["password"]}</p>{" "}
              </div>
            </Tooltip>
          </ClickAwayListener>
          <div className="form-group row justify-content-between justify-content-around">
            <button type="submit" className="btn btn-primary float-left">
              Login
            </button>
            <recaptcha loginAttempts={attempts} />
            {attempts ? (
              <Recaptcha
                className="float-right"
                sitekey="6LcAL78UAAAAAPOluo3jzUzXt5XLWKuUujc-_7QX"
                render="explicit"
                verifyCallback={verifyCallback}
                onloadCallback={reCaptchaLoaded}
              />
            ) : (
                ""
              )}
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            Forgot Password? <Link to="/forgotPassword">Click here</Link>
          </p>
        </form>
      </div>
    </div>
   </div>
  );
}
