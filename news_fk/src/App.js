import React, { Component } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './App.css';
import Header from './components/Header/Header';
import BottomLoader from './components/BottomLoader/BottomLoader';
import {API_PAGE_SIZE} from './constants';

class App extends Component {
  state = {
    initial_loading : true,
    should_load : false,
    currpage : 1,
    countrycode : "in",
    newscategory : "general",
    newsarticles : [],
    end_of_article : false
  }
  newsHandler = () => {
    if(!this.state.end_of_article) {
      console.log("loaded");
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
      .catch(err => {console.log("err")}) 
  
      this.setState({currpage : this.state.currpage+1});
    }
  }
  countryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      countrycode : event.target.value,
      currpage : 1,
      newsarticles : [],
      should_load : false,
      end_of_article : false
    });
    this.newsHandler();
  }
  categoryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      newscategory : event.target.value,
      currpage : 1,
      newsarticles : [],
      should_load : false,
      end_of_article : false
    });
    this.newsHandler();
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
          this.state.newsarticles.map( (elem,idx) => {
            return <h1 key={idx}>{elem.title}</h1>
          })
        }
        <BottomLoader load={!this.state.end_of_article} />
      </div>
    );
  }
  componentDidMount = () => {
    this.newsHandler();
  }
}

export default App;
