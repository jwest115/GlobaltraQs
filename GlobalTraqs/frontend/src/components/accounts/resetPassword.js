import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class resetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password1: '',
            password2: '',
            token: '',
            showError: false,
            messageFromServer: '',
            errors: {}
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    confirmPass = e => {
        e.preventDefault();
        if (!this.formIsValid()) {
            this.setState({
                showError: false,
                messageFromServer: ''
            });
        } else {
            axios
                .post('/api/password_reset/confirm/', {
                    token: this.props.match.params.token,
                    password: this.state.password1
                })
                .then(response => {
                    console.log(response.data);
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
    formIsValid(){
        let errors = {};
        let formIsValid = true;
        if(this.state.password1 === this.state.password2){
            formIsValid = true;
            errors["password"] = "";
            errors["password2"] = "";
        }
        if (this.state.password1.length < 8){
            formIsValid = false;
            errors["password"] = "*Password must be at least 8 characters long."
        }
        if (this.state.password1 !== this.state.password2) {
            formIsValid = false;
            errors["password2"] = "*Passwords do not Match";
        }
        if (this.state.password1.search(/[!@#$%^&*_+()]/) === -1) {
            formIsValid = false;
            errors["password"] = "*Password must contain a special character like: !@#$%^&*)(_+"
        }
        if(this.state.password1.search(/\d/) === -1){
            formIsValid = false;
            errors["password"] = "*Password must contain at least 1 number"
        }
        if (this.state.password1.search(/[a-zA-Z]/) === -1) {
            formIsValid = false;
            errors["password"] = "*Password must contain a Letter"
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    render() {
        const {password1, password2} = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Forgot Password</h2>
                    <form className="profile-form" onSubmit={this.confirmPass}>
                        <div className="form-group">
                            <p>
                                Please input your new password:
                            </p>
                            <TextField
                                id='password1'
                                label='password1'
                                value={password1}
                                onChange={this.handleChange('password1')}
                                placeholder="password"
                            />
                            <p className="text-danger">{this.state.errors["password1"]}</p>

                            <p>
                                Please Confirm your password:
                            </p>
                            <TextField
                                id='password2'
                                label='password2'
                                value={password2}
                                onChange={this.handleChange('password2')}
                                placeholder="Confirm Password"
                            />
                            <p className="text-danger">{this.state.errors["password2"]}</p>

                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary float-left"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default resetPassword;