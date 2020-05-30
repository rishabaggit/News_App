import React, { Component } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './App.css';
import Header from './components/Header/Header';
import BottomLoader from './components/BottomLoader/BottomLoader';
import DisplayNewsCards from './components/DisplayNewsCards/DispalyNewsCards';
import FetchErrorHandler from './components/FetchErrorHandler/FetchErrorHandler';
import InitialLoader from './components/InitialLoader/InitialLoader';
import {API_PAGE_SIZE} from './constants';

class App extends Component {
  state = {
    initial_loading : true,
    should_load : false,
    currpage : 1,
    countrycode : "in",
    newscategory : "general",
    newsarticles : [],
    end_of_article : false,
    error_found : false
  }
  newsHandler = () => {
    if(!this.state.end_of_article) {
      this.setState({should_load : false})
      const url = `http://newsapi.org/v2/top-headlines?country=${this.state.countrycode}&category=${this.state.newscategory}&pageSize=${API_PAGE_SIZE}&page=${this.state.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(fin => {
        this.setState({
          initial_loading : false,
          newsarticles : [...this.state.newsarticles , ...fin.articles],
          should_load : true
        })
        if(fin.articles.length < API_PAGE_SIZE) {
          this.setState({end_of_article : true})
          console.log("triggered");
        }
      })
      .catch(err => {this.setState({error_found : true})})
  
      this.setState((prevState,props) => {
        return {
          currpage : prevState.currpage+1
        }
      });
    }
  }
  countryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      countrycode : event.target.value,
      currpage : 1,
      newsarticles : [],
      should_load : false,
      end_of_article : false,
      error_found : false
    }
    , this.newsHandler);
  }
  categoryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      newscategory : event.target.value,
      currpage : 1,
      newsarticles : [],
      should_load : false,
      end_of_article : false,
      error_found : false
    }, this.newsHandler);
  }
  onBottomHandler = () => {
    if(this.state.should_load) {
      this.newsHandler();
    }
  }
  render() {
    return (
      <div>
        <BottomScrollListener onBottom={this.onBottomHandler}/>
        <Header 
          country={this.state.countrycode}
          category={this.state.newscategory}
          countryChangeHandler={this.countryChangeHandler}
          categoryChangeHandler={this.categoryChangeHandler}
        />
        {
        this.state.error_found ?
        <FetchErrorHandler/> : 
        (
          this.state.initial_loading ?
          <InitialLoader/> :
          <div>
          <DisplayNewsCards articles={this.state.newsarticles}/>
          <BottomLoader load={!this.state.end_of_article} />
        </div>
        )
        }
      </div>
    );
  }
  componentDidMount = () => {
    this.newsHandler();
  }
}

export default App;
