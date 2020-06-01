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

class App extends Component {
  onBottomHandler = () => {
    if(this.props.should_load) {
      this.props.newsHandler();;
    }
  }

  Display = () => {
    if(this.props.error_found) {
      return <FetchErrorHandler/>;
    }
    else if(this.props.initial_loading) {
      return <InitialLoader/>;
    }
    else {
      return (
        <div>
            <DisplayNewsCards articles={this.props.newsarticles}/>
            <BottomLoader load={!this.props.end_of_article} />
        </div>
      );
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
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
  componentDidMount = () => {
    this.props.newsHandler();;
  }
}

const mapStateToProps = state => {
  return {
    initial_loading : state.initial_loading,
    should_load : state.should_load,
    newsarticles : state.newsarticles,
    end_of_article : state.end_of_article,
    error_found : state.error_found
  };
};

const mapDispatchToProps = dispatch => {
  return {
      newsHandler : () => dispatch(actionTypes.newsHandler())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);