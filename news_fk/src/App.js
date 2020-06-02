
//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in App.js

import React, { Component } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './App.css';
import Header from './components/Header/Header';
import BottomLoader from './components/Content/BottomLoader/BottomLoader';
import DisplayNewsCards from './components/Content/DisplayNewsCards/DispalyNewsCards';
import FetchErrorHandler from './components/Content/FetchErrorHandler/FetchErrorHandler';
import InitialLoader from './components/Content/InitialLoader/InitialLoader';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import NewsBulletin from './components/Content/NewsBulletin/NewsBulletin';
import Info from './components/Info/Info';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';


//-----------------------------------------------------------------------------------------------------------------
//index.js is the traditional and actual entry point for all node apps. Here in react it just has code of what to render and where to render. 
// App.js has the root component of the react app because every view and component are handled with hierarchy in React, where <App /> is the top most component in hierarchy. 
class App extends Component {

  //-----------------------------------------------------------------------------------------------------------------
  
  onBottomHandler = () => {                     //Arrow Function Executed Upon Reaching the bottom of entire screen                    
    if(this.props.should_load) {
      this.props.newsHandler();;                //Invoke news handler if should_load is true because user has hit bottom for the first time.
    }
  }
  //------------------------------------------------------------------------------------------------------------------

  Display = () => {
    if(this.props.error_found) {                // Render FetchErrorHandler Component to display Error Sign in Components Folder if error_found set to true.
      return <FetchErrorHandler/>;
    }
    else if(this.props.initial_loading) {       // Render InitialLoader Component to display rotating Spinner in Components Folder if page loaded for first time.
      return <InitialLoader/>;
    }
    else {                                      //Render DispalyNewsCards to display news article and BottomLoader to display loader in other cases
      return (
        <div>
            <DisplayNewsCards articles={this.props.newsarticles}/>  
            <BottomLoader load={!this.props.end_of_article} />
        </div>
      );
    }
  }

  //-----------------------------------------------------------------------------------------------------------------
  
  render() {
    return (                                     //Component able to render and read routes should be wrapped in BrowserRouter Object.
      <BrowserRouter>                          
        <div>
                                                {/* BottomScrollListener is a react utility to check if we have hit the end of page*/}
                                                {/* Rendering Component as described below */}
          <BottomScrollListener onBottom={this.onBottomHandler}/>    
          <Header/>
          <NewsBulletin/>
          <Switch>
              <Route path="/" exact component={this.Display}/>
              <Route path="/info" exact component={Info}/>
              <Route render={() => <h2 style={{textAlign:"center", fontWeight:"bold"}}>Page Link Broken!</h2> } />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }

  //--------------------------------------------------------------------------------------------------------------
  //componentDidMount is executed after the first render only on the client side and shall be executing newsHandler defined in.
  
  componentDidMount = () => {
    this.props.newsHandler();;
  }
}


//------------------------Redux Section----------------------------------------------------------------------------
//mapStateToProps helps in getting the updated state from store in app.js as props

const mapStateToProps = state => {
  return {
    initial_loading : state.initial_loading,
    should_load : state.should_load,
    newsarticles : state.newsarticles,
    end_of_article : state.end_of_article,
    error_found : state.error_found
  };
};


//mapDispatchToProps() is a utility which will help your component to fire an action event newshandler with action: newshandler() and no payload.

const mapDispatchToProps = dispatch => {
  return {
      newsHandler : () => dispatch(actionTypes.newsHandler())
  }
};

//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(App);

//-----------------------------------------------------------------------------------------------------------------