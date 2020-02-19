import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import Recaptcha from "react-recaptcha";
import * as EmailValidator from 'email-validator';
// import { validateAll } from "indicative";
export class Register extends Component {
  //
  constructor(props) {
    super(props);
    this.reCaptchaLoaded = this.reCaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  reCaptchaLoaded() {
    console.log("captcha successfully loaded");
  }
  verifyCallback(response) {
    if (response) {
      this.setState({
        captchaIsVerified: true
      });
    }
  }
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    captchaIsVerified: false,
    inputs: {},
    errors: {}
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.captchaIsVerified) {
      const {username, email, password, password2} = this.state;
      if (password !== password2) {
        this.props.createMessage({
          passwordNotMatch: "Passwords do not match"
        });
      } else if(this.formIsValid()){
        const newUser = {
          username,
          password,
          email
        };
        this.props.register(newUser);
      }
    } else {
      alert("please verify that you are a human!");
    }
    // this.formIsValid();
  };

  formIsValid(){
    let errors = {};
    let formIsValid = true;
    if (this.state.username === "") {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }
    if (this.state.username !== "") {
      errors["username"] = "";
    }
    if (this.state.password !== "") {
      errors["password"] = "";
    }
    if (this.state.password.length < 8) {
      formIsValid = false;
      errors["password"] = "*Password must be at least 8 characters long";
    }
    if (!this.state.password === "") {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    if (this.state.email === "") {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (this.state.email !== "") {
      errors["email"] = "";
    }
    if (!EmailValidator.validate(this.state.email)) {
      formIsValid = false;
      errors["email"] = "*Please enter a valid email";
    }
    if (this.state.password !== this.state.password2) {
      formIsValid = false;
      errors["password2"] = "*Passwords do not Match";
    }
    if (this.state.password === this.state.password2) {
      errors["password2"] = null;
    }
    if (this.state.password.search(/[!@#$%^&*_+()]/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain a special character like: !@#$%^&*)(_+"
    }
    if(this.state.password.search(/\d/) === -1){
      formIsValid = false;
      errors["password"] = "*Password must contain at least 1 number"
    }
    if (this.state.password.search(/[a-zA-Z]/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain a Letter"
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
              <div name="userStatus" />
              <p className="text-danger">{this.state.errors["username"]}</p>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
              <div id="emailStatus" />
              <p className="text-danger">{this.state.errors["email"]}</p>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
              <p className="text-danger">{this.state.errors["password"]}</p>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
              <p className="text-danger">{this.state.errors["password2"]}</p>
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
                verifyCallback={this.verifyCallback}
                onloadCallback={this.reCaptchaLoaded}
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register, createMessage })(Register);
