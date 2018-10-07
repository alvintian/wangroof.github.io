import React, { Component } from 'react';
import $ from 'jquery';

class Estimates extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: '',
			address: '',
			postalcode: '',
			message: ''
		};
		this.fd = new FormData();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
	}
		handleSubmit(event) {
		event.preventDefault();
 			$.ajax({
			url: '/api/Estimates',
			method: 'POST',
			data: {
			name: this.state.name,
			email:this.state.email,
			phone:this.state.phone,
			address:this.state.address,
			postalcode:this.state.postalcode,
			message:this.state.message
			}});

alert("Submitted");
	}

	render() {
		return (
			<div className='container'>
			<h2 className="heading-font">We will contact you back as soon as possible :)</h2>
	<form onSubmit={this.handleSubmit} style={{color:"black"}}>
   	<div className='row'>
   	<div className='col-25'><label>Name: </label></div>
     <div className='col-75'>
     <input style={{width:'85%'}} type="text" name="name"
        value={this.state.name} onChange={this.handleChange} /></div>
   	<div className='col-25'><label>Email:  </label></div>
     <div className='col-75'>
     <input style={{width:'85%'}} type="text"  name="email"
        value={this.state.email} onChange={this.handleChange} /></div>
   	<div className='col-25'><label>Phone: </label></div>
      <div className='col-75'>
      <input style={{width:'85%'}} type="text"  name="phone"
        value={this.state.phone} onChange={this.handleChange} /></div>
   	<div className='col-25'><label>Address: </label></div>
      <div className='col-75'>
     <input style={{width:'85%'}} type="text"  name="address"
        value={this.state.address} onChange={this.handleChange} /></div>
   	<div className='col-25'><label>Postal Code: </label></div>
      <div className='col-75'>
     <input style={{width:'85%'}} type="text"  name="postalcode"
        value={this.state.postalcode} onChange={this.handleChange} /></div>
   </div>

	<div className= 'right_form'>
	<label>Write a bit about your situation:</label>
	<textarea
	className="textarea"
	name="message"
	value={this.state.message}
	onChange={this.handleChange}
	style={{height: '180px',maxWidth:'80%',width:'80%'}}
	/>	
	<input
	type="file"
	name="photo"
	className="photo"
	onChange={this.handleUpload}
	style={{display: 'block'}}
	/>
	</div>
	<input
	type="submit"
	value="Submit"
	className="create-char-button"
	style={{ height: '40%', width: '40%' }}
	/>
	</form>
	</div>
		)}

}

export default Estimates;