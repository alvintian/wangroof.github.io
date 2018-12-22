import React, { Component } from 'react';
import Comments from './Comments.jsx';
import {DB_CONFIG} from './Config/Firebase/db_config';
import firebase from 'firebase/app';
import 'firebase/database';

class Feedback extends Component {
	constructor(props) {
		super(props);

//  if (!firebase.apps.length) {
//   firebase.initializeApp({});
//     this.app=firebase.initializeApp(DB_CONFIG);
//}

// if (!firebase.apps.length) {
//      this.app=firebase.initializeApp(DB_CONFIG);
// }
//   this.database = this.app.database().ref().child('comments');
if (!firebase.apps.length) {
firebase.initializeApp(DB_CONFIG);
}
this.database = firebase.database().ref().child('comments');


		this.state = {
			newName: '',
			userComments: '',
			comments:[]
	};
//	    this.getComments();
		this.fd = new FormData();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  // getComments = () => {
  //   $.get('/api/Feedback', data => {
  //     this.setState({
  //       comments: data,
  //     });
  //   });
  // };
  componentWillMount(){
const currentComment = this.state.comments;

this.database.on('child_added', snap => {
  currentComment.push({
	id:snap.key,
    comment: snap.val().comment
  })
 this.setState({
        comments: currentComment,
      });
})
}

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
 		// 	$.ajax({
			// url: '/api/Feedback',
			// method: 'POST',
			// data: {
			// comments: this.state.userComments
			// },
			// success: console.log('post success'),
			//  });
// this.database.update({
// [commentId]: {
//     comment: this.state.userComments
//   }
// });
//var postsRef = ref.child("posts");
this.database.push().set({
	comment: this.state.userComments
});
// this.database.update({
//   test:{
//   date_of_birth: "June 23, 1912"
// }
// });

	this.setState({userComments:""});
	alert("Submitted",this.state);
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