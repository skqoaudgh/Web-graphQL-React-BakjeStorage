import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainNavigation from './components/Navigation/mainNavigation';
import writePage from './pages/Write';
import listPage from './pages/List';
import authPage from './pages/Auth';
import AuthContext from './components/Context/auth';

import './App.css';

class App extends Component {

  state = {
    userId: null,
    token: null
  }

  login = (UserId, token, tokenExpiration) => {
    this.setState({
      userId: UserId,
      token: token
    })
  }
         
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login
        }}>
          {this.state.token && <MainNavigation />}
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect path="/" to="/auth" exact/>}
              {this.state.token && <Redirect path="/" to="/list" exact/>}
              {this.state.token && <Redirect path="/auth" to="/list" exact/>}
              {!this.state.token && <Route path="/auth" component={authPage} />}
              {this.state.token && <Route path="/list" component={listPage} />}
              {this.state.token && <Route path="/write" component={writePage} />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
