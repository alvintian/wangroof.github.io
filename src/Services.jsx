import React, { Component } from 'react';
import roofService1 from './images/roofService1.jpg';
import roofService2 from './images/roofService2.jpg';
import roofService3 from './images/roofService3.png';

const container_block = {

	padding: '30px 40px',
    width: '100%'
}

class Services extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div style={container_block}>
				<h2 className="heading-font">We provide roof repair, roof installation, blah blah</h2>
						<div className='box_1'>
						<div className="wsite-content-title" style={{float:'left', width: '50%'}}><h2>Shingle replacement!</h2>
						<p>shingles shingles shingles</p></div>
                		<img
                		  alt=""
                		  src={roofService1}
                		  style={{ width: '324px', height: '182px', margin: '30px' }}
                		/>
						</div>
						<div className='box_2'>
						<div className="wsite-content-title" style={{float:'left', width: '50%'}}><h2>Roof leak!</h2>
						<p>roof repair roof repair roof repair</p></div>
						<img
                  		alt=""
                  		src={roofService2}
                  		style={{ width: '324px', height: '182px', margin: '30px' }}
                		/>
                		</div>
                		<div className = 'box_3'>
						<div className="wsite-content-title" style={{float:'left', width: '50%'}}><h2>New roofing!</h2>
						<p>roof replacement new roof hot roof best roof sun screen roof renewable roof top coal roof</p></div>
                		<img
                  		alt=""
                  		src={roofService3}
                  		style={{ width: '324px', height: '182px', margin: '30px' }}
                		/>
						</div>
     		</div>
		);
	}

}

export default Services;