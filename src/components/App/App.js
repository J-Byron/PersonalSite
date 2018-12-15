import React, { Component } from 'react';
import './App.css';

// *----------* Routing *----------*
import { HashRouter as Router, Route, Link } from "react-router-dom";

// *----------* Page Components *----------*
import HomePage from '../HomePage/HomePage';
// import PortfolioPage from '../PortfolioPage/PortfolioPage';
// import AdminPage from '../AdminPage/AdminPage'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={HomePage} style={{backdropFilter:'blur(5px)'}}/>
          {/* <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/admin" component={AdminPage} /> */}
        </Router>
        </div>
    );
  }
}

export default App;
