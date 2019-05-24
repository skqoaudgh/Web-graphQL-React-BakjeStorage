import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainNavigation from './components/Navigation/mainNavigation';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    );
  }
}

export default App;
