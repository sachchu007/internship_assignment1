import React, { Component } from 'react';
import {DataContext} from '../context/DataContext';
import DataContextProvider from '../context/DataContext';
import View from './View'


class AddUser extends Component{
    static contextType = DataContext;
    constructor(){
        super();
        this.state = { 
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            avatar : '',
            returnView : false
        }
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    } 
  
    submitHandler = (e) => {
        e.preventDefault();
        console.log('from adduser',this.context);
        let temp = this.context.userList;
   
         let anotherTemp = this.state;
         delete anotherTemp.returnView;
       temp.push(anotherTemp);
   
       this.context.adduser(temp); 
       alert('new user has been added');
       this.setState({
           returnView : true
    }) ;
    };
    render(){
         // console.log(this.adduser);
        console.log('hello from add user');
        if(!this.state.returnView){
        return (
            <div>
                <h1>Enter Your Details please!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='id' onChange={this.changeHandler} placeholder='id' required />
                    <input type='text' name='email' onChange={this.changeHandler} placeholder='email' required />
                    <input type='text' name='first_name' onChange={this.changeHandler} placeholder='first_name' required />
                    <input type='text' name='last_name' onChange={this.changeHandler} placeholder='last_name' required />
                    <input type='text' name='avatar' onChange={this.changeHandler} placeholder='link to avatar' required />
                    <button type='submit'>Add User</button>
                </form>
            </div>);
        }
        else
        {
            return(
         <DataContextProvider>
            <View/>
        </DataContextProvider>
            );
        }
    }
}
export default AddUser;

