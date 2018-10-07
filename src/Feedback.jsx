import React, { Component } from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';


class Feedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newName: '',
			userComments: '',
			comments:[]
	};
	    this.getComments();
		this.fd = new FormData();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  getComments = () => {
    $.get('/api/Feedback', data => {
      this.setState({
        comments: data,
      });
    });
  };


	handleChange(event) {
	    this.setState({userComments: event.target.value});
	}
		handleSubmit(event) {
		event.preventDefault();
		// fetch('/api/Feedback', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		comments: this.state.userComments,
		// 	}),
		// })
 			$.ajax({
			url: '/api/Feedback',
			method: 'POST',
			data: {
			comments: this.state.userComments
			},
			success: console.log('post success'),
			 });
  			this.setState({userComments:""});
	alert("Submitted");
	}
//    loadTweets() {
//   $.ajax({
//     url: "http://localhost:8080/tweets",
//     method: 'GET',
//     success: function(morePostsHtml) {
//       renderTweets(morePostsHtml);
//     }
//   });
// }


	render() {
		let content = this.state.comments;
		return (
			<div>
				<h2 className="heading-font">tell us how we did, leave a comment</h2>

				{content.map(x => (
					<Comments
						comment={x}
						key={x.id}
					/>
				))}

	<form style={{clear:"both"}}
	onSubmit={this.handleSubmit}>
	<textarea
	style={{
	height: '40%', 
	width: '40%',
    margin: '10px'
  	}}
	className="textarea"
	value={this.state.userComments}
	onChange={this.handleChange}
	/>
		<input
	type="submit"
	value="Submit"
	className="create-char-button"
	style={{ height: '40%', width: '40%' }}
	/>
</form>
				</div>
		);
	}

}

export default Feedback;