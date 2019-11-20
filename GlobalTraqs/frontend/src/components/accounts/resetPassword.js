import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Link from "@material-ui/core/Link";

export default class resetPassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            update: false,
            isLoading: true,
            error: false
        };
    }

    async componentDidMount() {
        console.log(this.props.match.params.token);
        await axios
            .get('/api/auth/user', {
                params: {
                    resetPasswordToken: this.props.match.params.token,
                }
            })
            .then(response => {
                console.log(response);
                if (response.data.message === 'password reset link a-ok') {
                    this.setState({
                        username: response.data.username,
                        update: false,
                        isLoading: false,
                        error: false
                    });
                } else {
                    this.setState({
                        update: false,
                        isLoading: false,
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log(error.data);
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };
    updatePassword = e => {
        e.preventDefault();
        axios
            .put('/api/auth/user', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log(response.data);
                if (response.data.message === 'password updated') {
                    this.setState({
                        updated: true,
                        error: false
                    });
                } else {
                    this.setState({
                        updated: false,
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log(error.data);
            })
    };

    render() {
        const {password, error, isLoading, updated} = this.state;

        if (error) {
            return (
                <div>
                    <h4>A Problem occurred trying to reset the password.</h4>
                    <p>
                        Want to go back to <Link to="/forgotPassword">Forgot Password?</Link>
                    </p>
                </div>
            )
        } else if (isLoading) {
            return (
                <div>
                    <h4>Loading User Data...</h4>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="col-md-6 m-auto">
                        <div className="card card-body mt-5">
                            <h2 className="text-center">Reset Password</h2>
                            <form className="password-form" onSubmit={this.updatePassword}>
                                <div className="form-group">
                                    <p>
                                        Please input a new password:
                                    </p>
                                    <TextField
                                        id='password'
                                        label='password'
                                        value={password}
                                        onChange={this.handleChange('password')}
                                        placeholder="********"
                                        type="password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary float-left"
                                >
                                    Reset Password
                                </button>
                            </form>
                            {updated ** (
                                <div>
                                    <p>
                                        Your password has been successfully reset, please try logging in.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }

    }
}