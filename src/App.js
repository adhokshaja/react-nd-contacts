import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI' 
import {Route} from 'react-router-dom'

class App extends Component {
  state={
    screen:'list', //list, create
    contacts : [
      {
        "id": "placeholder",
        "name": "Loading ",
        "email": "loading",
        "avatarURL": ""
      }
    ]
  };
  removeContact = (contact)=>{
    this.setState((currState)=>({
        contacts:currState.contacts.filter((c)=>c.id!==contact.id)
      })
    );
    ContactsAPI.remove(contact);
  };
  fetchContacts=()=>{
    ContactsAPI.getAll()
      .then(contacts=>this.setState({contacts:contacts}));
  }
  createContact=(contact)=>{
    ContactsAPI.create(contact).then(contact=>{
      this.setState((currState)=>({
        contacts : [...currState.contacts,contact]
      }))
    })
  }

  componentDidMount() {
    this.fetchContacts();
  }
  render() {
    return (
      <div className='app'>
      <Route exact path='/'  render={()=>(
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contactsList= {this.state.contacts}
          />
        )}
      />
      <Route path='/create'
        render={({history})=>(
           <CreateContact
           onCreateContact={(contactDetails)=>{
              this.createContact(contactDetails);
              history.push('/');
            }} 
           />
        )}
      />
      </div>
    );
  }
}

export default App;
