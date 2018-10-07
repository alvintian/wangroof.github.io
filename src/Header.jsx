import React, { Component }  from 'react';

class Header extends Component {
		constructor(props) {
		super(props);
	}

	render(){
	return (
		<div>
                <img
                  alt=""
                  src={RoofLogo}
                  style={{ width: '324px', height: '182px', float: 'left', marginLeft: '20px' }}
                />
      <h1 style={{ fontWeight: 'bold', lineHeight: '30px',textAlign: 'center', margin:'20px' }}>
        Wang Roofing
      </h1>
      <h3 style={{textAlign: 'center',margin: '20px' }}>
        call today and get your free estimates!
      </h3>
		</div>
		);
}
}
export default Header;

	