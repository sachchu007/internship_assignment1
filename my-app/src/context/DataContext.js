import React, { createContext, Component } from 'react';
import axios from 'axios';

export const DataContext = createContext();

class DataContextProvider extends Component{ 
    constructor(){
       super();
        this.state = {
            userList : [] 
        };
        this.updateData();
        this.adduser = this.adduser.bind(this);
    }
   updateData = async () =>{
        axios.get('https://reqres.in/api/users')
             .then((res)=>{
                
                 this.setState({
                     userList : res.data.data
                 })
             })
             .catch((e)=>{
                 console.log('error from DataContext',e);
             })
    }
    async adduser (newuser){
         console.log('inside the datacontext');
         this.setState({
            userList : newuser
        })
        console.log('from context user added',this.state.userList);
    }    
        render(){
            console.log('from context',this.state.userList)
            return (
             <DataContext.Provider value = {{...this.state, adduser: this.adduser }}>
                                          {/* ,adduser: this.adduser  */}
                 {this.props.children}
             </DataContext.Provider>
            );
        }
}
export default DataContextProvider;