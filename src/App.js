import React, { Component } from 'react';
import {
  NavLink,
  Switch,
  Route,
  // Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
import About from './About.jsx';
import Services from './Services.jsx';
import Feedback from './Feedback.jsx';
import Photos from './Photos.jsx';
import Estimates from './Estimates.jsx';
import RoofLogo from './images/your-roof.jpg';
// import TwitterwarsHome from './images/twiterwarshome.png';

const Home = () => (
  <div>
{/*    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>*/}
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
{/*      <img
        src={TwitterwarsHome}
        width={'300px'}
        style={{ marginTop: '20px' }}
        alt=""
      />*/}
 {/*     <h1 className="heading-font">Create Your Character!</h1>
      <div className="create-char-button">
        <Link
          style={{ textDecoration: 'none', color: '#111111' }}
          to="/NewChar">
          Create Character
        </Link>
      </div>
      <h1 className="heading-font">View Current Battles! </h1>
      <div className="create-char-button">
        <Link
          style={{ textDecoration: 'none', color: '#111111' }}
          to="/CurBattle">
          View Battles!
        </Link>
      </div>*/}
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
class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      matchState: {},
    };
        this.getData();
        this.matchInfo = this.matchInfo.bind(this);
        // this.postBattletoDB = this.postBattletoDB.bind(this);
        // this.postChartoDB = this.postChartoDB.bind(this);
    // this.handleClickCard=this.handleClickCard.bind(this);
  }

  matchInfo(match) {
    this.setState({
      matchState: match,
    });
  }
  getData = () => {
    $.get('/api/Photos', data => {
      this.setState({
        pictures: data,
      });
    });
  };
  // postBattletoDB(team_Red, team_Blue) {
  //   fetch('/api/Photos', {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     //make sure to serialize your JSON body
  //     body: JSON.stringify({
  //       teamRed: team_Red,
  //       teamBlue: team_Blue,
  //     }),
  //   });
  // }
  postChartoDB(charName, charAttr) {
    // $.ajax({
    //  url: '/api/NewChar',
    //  method: 'POST',
    //  data: {
    //    character: charName,
    //    select: charAttr,
    //  },
    //  success: console.log(charAttr, 'post success'),
    // });
    fetch('/api/Photos', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        character: charName,
        select: charAttr,
      }),
    }).then(response => {
      //      this.getData();
    });
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
              <Route exact path="/" />
              <Route exact path="/About" render={() => (<About/>)} />
              <Route exact path="/Services" render={() => (<Services/>)} />
              <Route exact path="/Feedback" render={() => (<Feedback/>)} />
              <Route exact path="/Estimates" render={() => (<Estimates/>)} />
              <Route exact path="/Photos" render={() => (<Photos postChartoDB={this.postChartoDB} admin={this.state.pictures}/>)}/>
                )}
              />


                )}
              />
            </Switch>
<Bottom/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
