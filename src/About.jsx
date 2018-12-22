import React, { Component } from 'react';
import businessCard from './images/businessCard.jpg';
class About extends Component {
	// constructor(props) {
		// super(props);
		// this.state = {
		// };
	// }
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
	      		<img
                		  alt=""
                		  src={businessCard}
                		  style={{margin: '30px' }}
                		/>
				</div>
		);
	}
}

export default About;
