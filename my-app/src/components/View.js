import React, { Component } from 'react';
import {DataContext} from '../context/DataContext'
import { Link } from 'react-router-dom';
import DataContextProvider from '../context/DataContext';
import AddUser from './add user'
import {Button, Table} from 'reactstrap'

class View extends Component{   
 static contextType = DataContext;
 constructor(props)
 {
   super(props);
   this.state={
     addUser : false,
     editUser : false,
     id : '',
     email: '',
     first_name: '',
     last_name: '',
     avatar : '',
   };
 }
 changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value });
} 

 submitHandler = (e) => {
  e.preventDefault();
  this.setState({
    addUser: true
});
  console.log('inside the asubmitHandler',this.state.addUser);
};

adduserConsole = () =>{
  this.setState({addUser : true})
}

edituserConsole=(editedid) =>{
this.setState({editUser : true,
               id: editedid});
}

submitHandler = (e) => {
  e.preventDefault();
  console.log('from adduser',this.context);
  let temp = this.context.userList;

   let anotherTemp = {
            id : this.state.id,
            email : this.state.email,
                       first_name : this.state.first_name,
                       last_name : this.state.last_name,
                       avatar : this.state.avatar 

   };
   delete anotherTemp.returnView;
  temp.push(anotherTemp);
 this.context.adduser(temp); 
 alert('new user has been added');
 this.setState({
     addUser : false
}) ;
};


edituser= (e)=>{
  e.preventDefault();
  let templist = this.context.userList;
  const index = templist.findIndex(x=> x.id === this.state.id);
  
  templist[index] = { id : this.state.id,
                       email : this.state.email,
                       first_name : this.state.first_name,
                       last_name : this.state.last_name,
                       avatar : this.state.avatar };
  
  this.context.adduser(templist);
   this.setState({editUser : false});
   alert('user details has been edited');
}
deleteuser = (id) =>{
   console.log('deleting whose id is',id);
   const k = this.context.userList;
   const templist = k.filter(item=> item.id !== id);
  
   this.context.adduser(templist);
   alert('user deleted');
}
 render(){  
  const users = this.context.userList;
  console.log('log from view', this.context);
  console.log('log from view',users);
  console.log('log frow view',this.state)
   
  if(this.state.addUser){
    return(
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
  //     <div>
  //     <DataContextProvider>
  //         <AddUser/>
  //     </DataContextProvider>
  // </div>
  }
  if(this.state.editUser){
    return(
      <div>
        <h1>Enter your updated details</h1>
        <form onSubmit={this.edituser}>
                    <input type='text' name='email' onChange={this.changeHandler} placeholder='email' required />
                    <input type='text' name='first_name' onChange={this.changeHandler} placeholder='first_name' required />
                    <input type='text' name='last_name' onChange={this.changeHandler} placeholder='last_name' required />
                    <input type='text' name='avatar' onChange={this.changeHandler} placeholder='link to avatar' required />
                    <button type='submit'>Submit Edited values</button>
                </form>
  </div>
    );
  } 

  else{
  return (
    <div >
       <h1>View Page</h1>
       <Table dark>
        <thead >
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Email</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td><img src={user.avatar} alt="image" width="50" height="50"></img> </td>
              <id> <button onClick={()=>{this.edituserConsole(user.id)}}    > Edit </button>  <button onClick={()=>{this.deleteuser(user.id)}}>Delete</button></id>
            </tr>
          ))}
        </tbody>
      </Table>   
      <form onSubmit={this.adduserConsole}>
                        <button type='submit'> Add a New User</button>
                     </form>

    </div>
    
  );}

}
}

export default View;