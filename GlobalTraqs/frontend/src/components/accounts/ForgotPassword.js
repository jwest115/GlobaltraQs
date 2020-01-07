import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showError: false,
            messageFromServer: ''
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    sendEmail = e => {
        e.preventDefault();
        if (this.state.email === '') {
            this.setState({
                showError: false,
                messageFromServer: ''
            });
        } else {
            axios
                .post('/api/password_reset/', {
                    email: this.state.email,
                })
                .then(response => {
                    if(response.data.toString().includes("object")){
                        window.alert("An e-mail has been sent with a link to change your password")
                    }
                    if (response.data === 'email not in db') {
                        this.setState({
                            showError: true,
                            messageFromServer: ''
                        });
                    } else if (response.data === 'recovery email sent') {
                        this.setState({
                            showError: false,
                            messageFromServer: 'recovery email sent'
                        });
                    }
                })
                .catch(error => {
                    console.log(error.data);
                });
        }
    };

    render() {
        const {email, messageFromServer, showNullError, showError} = this.state;

        return (

            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Forgot Password</h2>
                    <form className="profile-form" onSubmit={this.sendEmail}>
                        <div className="form-group">
                            <p>
                                Please input your e-mail:
                            </p>
                        <TextField
                            id='email'
                            label='E-mail'
                            value={email}
                            onChange={this.handleChange('email')}
                            placeholder="Email Address"
                        />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary float-left"
                        >
                            Forgot Password
                        </button>
                    </form>
                    {showNullError && (
                        <div>
                            <p className="text-danger">*You must input a email address </p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p className="text-danger">
                                *That email address doesn't exist, please try again or register for a new account
                            </p>
                        </div>
                    )}
                    {messageFromServer === 'recovery email sent' && (
                        <div>
                            <h3>Password Reset Email Sent Successfully!</h3>
                        </div>
                    )}
                </div>
            </div>

        )
    }
}

export default ForgotPassword;