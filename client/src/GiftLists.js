import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login/Login';
import List from './List/List';
import './GiftLists.scss';

class GiftLists extends Component {
  render() {
    return (
      <Router>
        <div className="GiftLists">
          <Route exact path='/' component={Login} />
          <Route path='/list/:listId' component={List} />
        </div>
      </Router>
    );
  }
}

export default GiftLists;
