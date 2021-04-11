import React, { Component } from 'react';
import axios from 'axios';
import View from './View'
import DataContextProvider from '../context/DataContext';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isloggedin: false
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post("https://reqres.in/api/login", this.state).then((res) => {
            console.log(res);
            if (res.data.token === '') {
                alert("Something went wrong from server side");
            }
            else {
                alert("login Sucessful.....routing to the userlist");
                this.setState({
                    isloggedin: true
                });
            }
        }).catch((error) => {
            alert("Please enter correct details");
            console.log('Error in submitHandler', error);
        });
    };

    render() {
        if (!this.state.isloggedin) {
            return (
                <div>
                    <h1>Login Please</h1>
                    <form onSubmit={this.submitHandler}>
                        <input type='text' name='email' onChange={this.changeHandler} placeholder='email' required />
                        <input type='password' name='password' onChange={this.changeHandler} placeholder='Password' required />
                        <button type='submit'>Login</button>
                    </form>
                </div>);
        }
        else {
            return (
                <div>
                    <DataContextProvider>
                        <View/>
                    </DataContextProvider>
                </div>
            )
        }
    }
}

export default Auth;