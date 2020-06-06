
//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in App.js

import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header/Header';
import NewsBulletin from './components/UI/NewsBulletin/NewsBulletin';
import Info from './containers/Info/Info';
import NewsPage from './containers/NewsPage/NewsPage';
import Login from './containers/Auth/LogIn';
import {Route, Switch} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import SignIn from './containers/Auth/SignIn';
import {connect} from 'react-redux';
//-----------------------------------------------------------------------------------------------------------------
//index.js is the traditional and actual entry point for all node apps. Here in react it just has code of what to render and where to render. 
// App.js has the root component of the react app because every view and component are handled with hierarchy in React, where <App /> is the top most component in hierarchy. 
class App extends Component { 

  componentDidMount(){
    document.body.style.backgroundColor = this.props.colorsObj.backgroundColor;
  };
  componentDidUpdate(){
    document.body.style.backgroundColor = this.props.colorsObj.backgroundColor;
  };
  
  componentWillUnmount(){
    document.body.style.backgroundColor = null;
  }

  render() {
    return (                                     //Component able to render and read routes should be wrapped in BrowserRouter Object.
      <div>
          <Header/>
          <Route path="/" exact component={NewsBulletin}/>
          <Switch>
              <Route path="/" exact render={() => (<NewsPage cookies={this.props.cookies}/>)}/>
              {/* <Route path="/info" exact component={Info}/> */}
              <Route path='/login' exact component={Login}/>
              <Route path='/signin' exact component={SignIn}/>
              <Route path="/info" exact render = {() => <Info{...this.props}/>}/>
              <Route render={() => <h2 style={{textAlign:"center", fontWeight:"bold"}}>Page Link Broken!</h2> } />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkMode: state.appModeReducer.darkMode,
    colorsObj: state.appModeReducer.colorsObj
  };
};
export default withCookies(connect(mapStateToProps, null)(App));