import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './components/Home';
import PublicVotes from './components/PublicVotes';
import LoginForm from './components/loginFrom';
import Votes from './components/Votes';

class App extends Component {
  state = {
    userId: 'nil'
  }
  componentDidMount(){
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