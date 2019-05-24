import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainNavigation from './components/Navigation/mainNavigation';
import writePage from './pages/Write';
import listPage from './pages/List';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route path="/list" component={listPage} />
            <Route path="/write" component={writePage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
