import React, { Component } from 'react';
import './App.css';


class Photo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	componentDidMount() {
		this.setState({ messages: this.props.ListMessage });
	}

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  render() {
//  			const { message } = this.props;

    return (
      <div>
        <img
        style={{float:"left",
                display:"inlineBlock",
                border: "2px solid",
                margin:"2px",
                padding:"5px",
                overflowWrap:"break-word",
                overflow:"hidden",
                textAlign: "center"}}
          className="small"
          src={this.props.photo.picture}
          onClick={this.handleShowDialog}
          alt=""
          width={'200px'} height={'200px'}
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "relative" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={this.props.photo.picture}
              onClick={this.handleShowDialog}
              alt=""
            />
          </dialog>
        )}
      </div>
    );
  }
				// <img src={this.props.photo.picture} width={'200px'} height={'200px'} alt="" />

}

export default Photo;
