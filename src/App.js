import React, { Component } from 'react';
import {
  NavLink,
  Switch,
  Route,
  // Link,
  BrowserRouter as Router,
} from 'react-router-dom';
// import $ from 'jquery';
import './App.css';
import About from './About.jsx';
import Services from './Services.jsx';
import Feedback from './Feedback.jsx';
import Photos from './Photos.jsx';
import Estimates from './Estimates.jsx';
import RoofLogo from './images/your-roof.jpg';
import {DB_CONFIG} from './Config/Firebase/db_config';
import firebase from 'firebase/app';
import 'firebase/database';
import contactPic from './images/roof8.jpg';

// import TwitterwarsHome from './images/twiterwarshome.png';

const Home = () => (
  <div>
             <img
                  alt=""
                  src={RoofLogo}
                  style={{ width: '500px', height: '220px', float: 'left', marginLeft: '20px' }}
                />
      <h1 style={{ fontWeight: 'bold', lineHeight: '30px',textAlign: 'center', margin:'20px' }}>
        Wang Roofing
      </h1>
      <h3 style={{textAlign: 'center',margin: '20px' }}>
        call today and get your free estimates!
      </h3>
  </div>
);
const Bottom = () => (
  <div className="footer">
Wang roofing.
TEL: 123-456-7890
Address: 21 Mt.Rushmore, Toronto.ON.A2Q 4F5
Business Hour: 24/7
</div>
);

function HomePic() {
  return (
    <div>
                  <img
                      alt=""
                      src={contactPic}
                      style={{margin: '30px' }}
                    />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

if (!firebase.apps.length) {
firebase.initializeApp(DB_CONFIG);
}
this.database = firebase.database().ref().child('picture');

    this.state = {
      pictures: []
          };
//        this.getData();
//        this.matchInfo = this.matchInfo.bind(this);
        // this.postBattletoDB = this.postBattletoDB.bind(this);
        // this.postChartoDB = this.postChartoDB.bind(this);
    // this.handleClickCard=this.handleClickCard.bind(this);
  }
  componentWillMount(){
const currentPicture = this.state.pictures;


this.database.on('child_added', snap => {
  currentPicture.push({
  src: snap.val().src,
  thumbnail: snap.val().thumbnail,
  key:snap.key
  })
 this.setState({
        pictures: currentPicture
      });
})
}

  render() {
    return (
      <div className="App">
        <Router>
          <div
            style={{ }}>

<Home/>

            <nav>
              <li>
                <NavLink
                  activeClassName="is-active"
                  style={{ textDecoration: 'none', color: '#Efedef' }}
                  to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: 'red' }}
                  style={{ textDecoration: 'none', color: '#Efedef' }}
                  to="/About">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: 'red' }}
                  style={{ textDecoration: 'none', color: '#Efedef' }}
                  to="/Services">
                  Services
                </NavLink>
              </li>
              <li>
                {
                  <NavLink
                    activeStyle={{ color: 'red' }}
                    style={{ textDecoration: 'none', color: '#Efedef' }}
                    to="/Feedback">
                    Feedback
                  </NavLink>
                }
              </li>
                 <li>
                {
                  <NavLink
                    activeStyle={{ color: 'red' }}
                    style={{ textDecoration: 'none', color: '#Efedef' }}
                    to="/Photos">
                    Photos
                  </NavLink>
                }
              </li>
                <li>
                {
                  <NavLink
                    activeStyle={{ color: 'red' }}
                    style={{ textDecoration: 'none', color: '#Efedef' }}
                    to="/Estimates">
                    Estimates
                  </NavLink>
                }
              </li>
            </nav>


            <Switch>
{/*              <Route exact path="/" component={Home} />*/}
              <Route exact path="/"    component={HomePic}/>
              <Route exact path="/About" render={() => (<About/>)} />
              <Route exact path="/Services" render={() => (<Services/>)} />
              <Route exact path="/Feedback" render={() => (<Feedback/>)} />
              <Route exact path="/Estimates" render={() => (<Estimates/>)} />
              <Route exact path="/Photos" render={() => (<Photos admin={this.state.pictures}/>)}/>
            </Switch>
<Bottom/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
