import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI' 

class App extends Component {
  state={
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
  componentDidMount() {
    this.fetchContacts();
  }
  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contactsList= {this.state.contacts}/>
      </div>
    );
  }
}

export default App;
