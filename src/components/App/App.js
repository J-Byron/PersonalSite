import React, { Component } from 'react';
import './App.css';

// *----------* Routing *----------*
import { HashRouter as Router, Route, Link } from "react-router-dom";

// *----------* Page Components *----------*
import HomePage from '../HomePage/HomePage';
import PortfolioPage from '../PortfolioPage/PortfolioPage';
// import AdminPage from '../AdminPage/AdminPage'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/portfolio" component={PortfolioPage} />
            {/* <Route path="/admin" component={AdminPage} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
