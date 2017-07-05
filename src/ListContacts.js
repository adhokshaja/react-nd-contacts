import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component{
	static propTypes = {
		contactsList:PropTypes.array.isRequired,
		onDeleteContact:PropTypes.func.isRequired,
		onNavigate:PropTypes.func
	} 
	state ={
		query:""
	}
	updateQuery = (query) => {
		this.setState({query:query.trim()});
	}
	clearQuery = () => {
		this.setState({query:''});
	}
	render(){
		const {query} = this.state;
		const {contactsList, onDeleteContact} = this.props;
		let showingContacts = contactsList;
		if(query){
			const Match = new RegExp(escapeRegExp(query),'i')
			showingContacts = showingContacts.filter(contact => Match.test(contact.name));
		}
		showingContacts.sort(sortBy('name'));
		return(
			<div className="list-contacts">
				<div className="list-contats-top">
					<input className="search-contacts" placeholder="Search Contacts" type="search" 
						value={query}
						onChange = {(event)=>this.updateQuery(event.target.value)}/>
					<Link 
					to='/create'
					className='add-contact'>
					Add Contact</Link>
				</div>
				{showingContacts.length !==contactsList.length && (
					<div className='showing-contacts'>
						<span>Now Showing {showingContacts.length} of {contactsList.length} contacts</span>
						<button onClick={()=>this.clearQuery()}> Show All </button>
					</div>
				)}
				<ol className='contact-list'>
					{
						showingContacts.map(contact => 
							(<li key={contact.id} className='contact-list-item'>
								<div className='contact-avatar' style={{
									backgroundImage:`url(${contact.avatarURL})`
								}}>
								</div>
								 <div className='contact-details'>
										<p>{contact.name}</p>
										<p>{contact.email}</p>
								</div>
								<button onClick={()=>onDeleteContact(contact)} className='contact-remove'>Remove</button>
							</li>)
						)
					}
				</ol>
			</div>
		)
	}

}



export  default ListContacts