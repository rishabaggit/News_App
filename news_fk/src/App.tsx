import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { RootState } from './index'
import { ModeColors } from 'colors';
import ReactGA from 'react-ga';
import Header from './containers/Header/Header';
import Info from './containers/Info/Info';
import NewsPage from './containers/NewsPage/NewsPage';
import SignIn from './containers/Auth/SignIn';
import Login from './containers/Auth/LogIn';
import LogOut from './containers/Auth/LogOut';
import UserProfile from './containers/UserProfile/UserProfile'
import LikedPosts from 'containers/LikedPosts/LikedPosts';
import Chat from 'containers/Chat/Chat'
import NewsBulletin from './components/UI/NewsBulletin/NewsBulletin';


interface AppProps {
  colorsObj: ModeColors;
  cookies: Cookies;
  darkMode: boolean;
}

class App extends Component<AppProps>{

  componentDidMount() {
    document.body.style.backgroundColor = this.props.colorsObj.backgroundColor;
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  componentDidUpdate() {
    document.body.style.backgroundColor = this.props.colorsObj.backgroundColor;
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <div>
        <Header cookies={this.props.cookies} />
        <Route path='/' exact render={() => <NewsBulletin darkMode={this.props.darkMode} />} />
        <Switch>
          <Route path='/' exact render={() => (<NewsPage cookies={this.props.cookies} />)} />
          <Route path='/login' exact render={() => <Login cookies={this.props.cookies} />} />
          <Route path='/signin' exact render={() => <SignIn cookies={this.props.cookies} />} />
          <Route path="/info" exact render={() => <Info colorsObj={this.props.colorsObj} />} />
          <Route path='/logout' exact render={() => <LogOut cookies={this.props.cookies} />} />
          <Route path='/userProfile' exact component={UserProfile} />
          <Route path='/likedPosts' exact component={LikedPosts} />
          <Route path='/chat' exact component={Chat} />
          <Route render={() => <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Page Link Broken!</h2>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownprops: any) => {
  return {
    darkMode: state.appModeReducer.darkMode,
    colorsObj: state.appModeReducer.colorsObj
  };
};
export default withCookies(connect(mapStateToProps)(App));