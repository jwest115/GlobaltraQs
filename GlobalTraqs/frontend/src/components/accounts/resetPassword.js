import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'

const title = {
    pageTitle: 'Password Reset Screen'
}
export default class resetPassword extends Component{
    constructor(){
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

    async componentDidMount(){
        console.log(this.props.match.params.token);
        await axios
            .get('http://127.0.0.1:8000/#/reset', {
                params: {
                    resetPasswordToken: this.props.match.params.token,
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.message === 'password reset link a-ok'){
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
            .put('http://127.0.0.1:8000/#/updatePasswordViaEmail', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log(response.data);
                if(response.data.message === 'password updated'){
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
    render(){
        const { password, error, isLoading, updated } = this.state;

        if(error){
            return(
                <div>
                    <h4>A Problem occurred trying to reset the password.</h4>
                    <Button></Button>
                </div>
            )
        }
    }
}