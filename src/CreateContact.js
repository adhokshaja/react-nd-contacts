import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ImageInput from "./ImageInput"
import serializeForm from "form-serialize"
import PropTypes from 'prop-types';

class CreateContact extends Component{
	static propTypes = {
		onCreateContact:PropTypes.func.isRequired
	}
	handleSubmit=(evt)=>{
		evt.preventDefault();
		const values = serializeForm(evt.target,{hash:true});
		this.props.onCreateContact(values);
	}
	render(){
		return (
			<div>
				<Link to='/' className='close-create-contact'>Close</Link>
				<form onSubmit={this.handleSubmit} className="create-contact-form">
					<ImageInput 
					className="create-contact-avatar-input" 
					name="avatarURL"
					maxHeight={64}
					/>
					<div className="create-contact-details">
						<input type="text" name="name" placeholder="Name"/>
						<input type="email" name="email" placeholder="Email"/>
						<button>Add Contact</button>
					</div>
				</form>
			</div>
		)
	}
}

export default CreateContact;