import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Recaptcha from "react-recaptcha";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.reCaptchaLoaded = this.reCaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this)
    }
    reCaptchaLoaded(){
        console.log('captcha successfully loaded');
    }
    verifyCallback(response){
        if(response){
            this.setState({
                captchaIsVerified: true
            })
        }
    }
    state = {
        username: "",
        password: "",
        captchaIsVerified: false,
        counter: 0,
        attempts: false,
        inputs: {},
        errors: {}
    };


    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };


    onSubmit = e =>{
        this.setState({ counter: this.state.counter + 1 });
        console.log("initial: " + this.state.counter);
        if (this.state.counter < 3){
            e.preventDefault();
            this.props.login(this.state.username, this.state.password);
            console.log("no captcha: "+ this.state.counter);
        }
        else{
            e.preventDefault();
            this.setState({
                attempts: true
            });
            if(this.state.captchaIsVerified){
                e.preventDefault();
                console.log("With captcha: "+ this.state.counter);
                this.props.login(this.state.username, this.state.password);
            }
            else {
                e.preventDefault();
                alert('please verify that you are a human!')
            }
        }
        this.validateForm();
    };
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (this.state.username === '') {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        if (this.state.username !== '') {
            errors["username"] = "";
        }
        if (this.state.password !== '') {
            errors["password"] = "";
        }
        if (this.state.password.length < 8) {
            formIsValid = false;
            errors["password"] = "*Password must be at least 8 characters long";
        }
        if (this.state.password === '') {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        this.setState({errors:errors});
        return formIsValid;
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render(){
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const attempts = this.state.attempts;
        const { username, password } = this.state;
        let captcha;
        if(attempts){
            captcha =
                <Recaptcha
                  className="float-right"
                  sitekey="6LcAL78UAAAAAPOluo3jzUzXt5XLWKuUujc-_7QX"
                  render="explicit"
                  verifyCallback={this.verifyCallback}
                  onloadCallback={this.reCaptchaLoaded}
                />
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
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
                            <p className="text-danger">
                                 {this.state.errors["username"]}
                            </p>
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
                            <p className="text-danger">
                                {this.state.errors["password"]}
                            </p>                        </div>

                        <div className="form-group row justify-content-between justify-content-around">
                            <button type="submit" className="btn btn-primary float-left">
                                Login
              </button>
                            <recaptcha loginAttempts={attempts}/>
                            {captcha}
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
        );
    }


}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(
    mapStateToProps,
    { login }
)(Login);