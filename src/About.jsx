import React, { Component } from 'react';
// import characterframe from "./characterframe.css";
// import Message from "./Message.jsx";
// import $ from 'jquery';
// import Popup from 'reactjs-popup';
// import { Redirect } from 'react-router-dom';
class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newName: '',
			twitterName: '',
			charAttr: '',
			newImage: '',
			newCharDescription: '',
			inputLinkClicked: false,
			modalIsOpen: false,
			active:false
		};
	}
	handleUpload = e => {
		this.fd.append('file', e.target.files[0]);
		for (var key of this.fd.entries()) {
			console.log(key[0], key[1], 'is the key there???');
		}
	};

	handleEnterPressed = event => {
		event.preventDefault();
		if (event.key === 'Enter') {
			//			this.props.postChartoDB(this.state.twitterName,"Tp")
			fetch('/api/NewChar', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				//make sure to serialize your JSON body
				body: JSON.stringify({
					character: this.state.twitterName,
					select: 'Tp',
				}),
			}).then(response => {
				//			console.log(response.json(response),"what is dada");
				//			console.log(response);
				response.json().then(data => {
					this.setState({
						newImage: data.twitterImage,
						newName: '',
						inputLinkClicked: true,
					});
				});
			});
		}
	};
	// onClick={this.setState({ inputLinkClicked:false })}
	componentDidMount() {}
	render() {
		return (
			<div
				style={{
					minHeight: '100%',
					minWidth: '100%',
					height: 'auto',
					width: 'auto',
				}}>
				<h2 className="body">hello, this is Wang roofing, my company will make your roof great again!</h2>
				</div>
		);
	}
}

export default About;
