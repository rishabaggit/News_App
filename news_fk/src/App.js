import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currpage : 1,
    country : "in",
    newscategory : "general"
  }
  fetchnews = () => {
    const url = `http://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.newscategory}&pageSize=10&page=${this.state.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(fin => {
      console.log(fin.articles);
    })
    .catch(err => {console.log("err")}) 
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
      <button onClick={this.fetchnews} > NEWS </button>
    );
  }
}

export default App;
