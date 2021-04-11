import React, { Component } from 'react';
import {DataContext} from '../context/DataContext'
import { Link } from 'react-router-dom';
import DataContextProvider from '../context/DataContext';
import AddUser from './add user'
import {Table} from 'reactstrap'
class View extends Component{   
 static contextType = DataContext;
 constructor(props)
 {
   super(props);
   this.state={
     addUser : false
   };
 }

 submitHandler = (e) => {
  e.preventDefault();

  this.setState({
    addUser: true
});
  console.log('inside the asubmitHandler',this.state.addUser);
};

 render(){
   
  const users = this.context.userList;
  console.log('log from view', this.context);
  console.log('log from view',users);
  console.log('log frow view',this.state)
  if(!this.state.addUser){
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
             
              { /* <td>
                <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                  View
                </Link>
                <Link
                  class="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user.id}`}>
                  Edit
                </Link>
                 <Link
                  class="btn btn-danger"
                  onClick={() => deleteUser(user.id)}>
                  Delete
                </Link> 
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>   
      <form onSubmit={this.submitHandler}>
                        <button type='submit'> Add a New User</button>
                     </form>

    </div>
    
  );}
  else{
    return(
      <div>
      <DataContextProvider>
          <AddUser/>
      </DataContextProvider>
  </div>
    );
  }
}
}

export default View;