import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//import cookie from 'react-cookies';
import Home from './components/Home';
import PublicVotes from './components/PublicVotes';
import LoginForm from './components/loginFrom';
import Votes from './components/Votes';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()

    this.onLogout = this.onLogout.bind(this)
  }
  state = {
    userId: 'nil'
  }
  componentDidMount(){
    //this.onLogout()
  }
  onLogout(){
    var fetchString = 'https://framework-react-api.herokuapp.com/api/frameworks/1';
    axios.put(fetchString, {
        name: 'react',
        vote: 0
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
    var fetchString = 'https://framework-react-api.herokuapp.com/api/frameworks/2';
    axios.put(fetchString, {
        name: 'angular',
        vote: 0
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
    var fetchString = 'https://framework-react-api.herokuapp.com/api/frameworks/3';
    axios.put(fetchString, {
        name: 'ember',
        vote: 0
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
    var fetchString = 'https://framework-react-api.herokuapp.com/api/frameworks/4';
    axios.put(fetchString, {
        name: 'vue',
        vote: 0
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="container">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/login/">Click Here to register to vote</Link>
              </li>
            </ul>
          </nav>
          <Home />
          <Switch>
            <Route exact path ={"/"} component={PublicVotes}/>
            <Route exact path ={"/login/"} render={(props) => <LoginForm userId={this.state.userId} />} />
            <Route exact path ={"/vote/"} component={Votes}/>
          </Switch>
        </Router>
      </div>
    );
  }
  
}
export default App;