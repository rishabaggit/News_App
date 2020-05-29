import React, { Component } from 'react';
import './App.css';
import NewsCard from './components/NewsCard/NewsCard'
import Header from './components/Header/Header'

class App extends Component {
  state = {
    currpage : 1,
    country : {country:"India", code:"in"},
    newscategory : "general"
  }
  fetchnews = () => {
    const url = `http://newsapi.org/v2/top-headlines?country=${this.state.country.code}&category=${this.state.newscategory}&pageSize=10&page=${this.state.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(fin => {
      console.log(fin.articles);
    })
    .catch(err => {console.log("err")}) 

    this.setState({currpage : this.state.currpage+1});
  }
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div>
        <Header currcountry={this.state.country}/>
        <button onClick={this.fetchnews} > NEWS </button>
        <NewsCard/>
      </div>
    );
  }
}

export default App;
