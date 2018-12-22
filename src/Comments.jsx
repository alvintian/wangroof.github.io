import React, { Component } from 'react';
import './App.css';
import './comments.css';

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {}

  render() {
        let comments = this.props.comment.comment;
 //   console.log(this.props.comment,"what's in the props??")
    return (
      <div className="block-comment-content module text">
        <div className="comment-user">
          <div className="comment-user-avatar-wrap">
          </div>
          <div className="comment-user-text">
            <a href="#0" data-username="cathbailh" className="comment-username">
                <span className="username">
                </span>
            </a>
          </div>
        </div>

        <div className="comment-text">
          <p>{comments}</p>
        </div>
      </div>
    );
  }

}

export default Comments;
