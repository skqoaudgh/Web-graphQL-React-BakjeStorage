import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainNavigation from './components/Navigation/mainNavigation';
import writePage from './pages/Write';
import postPage from './pages/Posts';
import authPage from './pages/Auth';
import AuthContext from './Context/auth';

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
  
  logout = () => {
    this.setState({
      userId: null,
      token: null
    })
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
          {this.state.token && <MainNavigation />}
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect path="/" to="/auth" exact/>}
              {this.state.token && <Redirect path="/" to="/post" exact/>}
              {this.state.token && <Redirect path="/auth" to="/post" exact/>}
              {!this.state.token && <Redirect path="/post" to="/auth" exact/>}
              {!this.state.token && <Redirect path="/write" to="/auth" exact/>}
              {!this.state.token && <Route path="/auth" component={authPage} />}
              {this.state.token && <Route path="/post" component={postPage} />}
              {this.state.token && <Route path="/write" component={writePage} />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
