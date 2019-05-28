import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainNavigation from './components/Navigation/mainNavigation';
import WritePage from './pages/Write';
import PostPage from './pages/Posts';
import AuthPage from './pages/Auth';
import AuthContext from './Context/auth';

import './App.css';

class App extends Component {

  state = {
    userId: null,
    token: null,
    fetchEvent: (args) => {}
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

  fetchEvent = (func) => {
    this.setState({
      fetchEvent: func
    })
  }

  componentWillMount() {
    const savedToken = localStorage.savedToken;
    const savedUserId = localStorage.savedUserId;
    if(savedToken !== 'null' && savedUserId !== 'null') {
      this.setState({userId: savedUserId, token: savedToken})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.token !== this.state.token && prevState.userId !== this.state.userId) {
      localStorage.savedToken = this.state.token;
      localStorage.savedUserId = this.state.userId;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout,
          fetchEvent: this.state.fetchEvent
        }}>
          {this.state.token && <MainNavigation history={this.props.history}/>}
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect path="/" to="/auth" exact/>}
              {this.state.token && <Redirect path="/" to="/post" exact/>}
              {this.state.token && <Redirect path="/auth" to="/post" exact/>}
              {!this.state.token && <Redirect path="/post" to="/auth" exact/>}
              {!this.state.token && <Redirect path="/write" to="/auth" exact/>}
              {!this.state.token && <Route path="/auth" component={AuthPage} />}
              {this.state.token && <Route path="/post" render={(props) => <PostPage {...props} fetchEvent={this.fetchEvent}/>}/>} 
              {this.state.token && <Route path="/write" component={WritePage} />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
