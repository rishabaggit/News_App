import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header'

class App extends Component {
  state = {
    initial_loading : true,
    currpage : 1,
    countrycode : "in",
    newscategory : "general",
    newsarticles : []
  }
  fetchnews = () => {
    const url = `http://newsapi.org/v2/top-headlines?country=${this.state.countrycode}&category=${this.state.newscategory}&pageSize=10&page=${this.state.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(fin => {
      this.setState({
        initial_loading : false,
        newsarticles : [...this.state.newsarticles , ...fin.articles]
      })
    })
    .catch(err => {console.log("err")}) 

    this.setState({currpage : this.state.currpage+1});
  }


  countryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      countrycode : event.target.value,
      currpage : 1,
      newsarticles : []
    });
  }
  categoryChangeHandler = (event) => {
    this.setState({
      initial_loading : true,
      newscategory : event.target.value,
      currpage : 1,
      newsarticles : []
    });
  }
  render() {
    return (
      <div>
        <Header 
          country={this.state.countrycode}
          category={this.state.newscategory}
          countryChangeHandler={this.countryChangeHandler}
          categoryChangeHandler={this.categoryChangeHandler}
        />
        <button onClick={this.fetchnews} > NEWS </button>
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchnews();
  }
}

export default App;
