import React from 'react';
import './App.css';
import axios from 'axios';

class tempComp extends React.Component {
  state={
    count:5,
    offset:0
  };
  
  news = () => {
    axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/news?mkt=en-IN&count=${this.state.count}&offset=${this.state.offset}&category=India` , {headers: { 'Ocp-Apim-Subscription-Key': 'c6d67c89ed214cb1ac89792869e11068' }})
      .then(response => {
        console.log(response.data.value);
        this.setState({offset : this.state.offset + this.state.count});
      })
      
  };

  render() {
    return(
    <div>
      <h1>HELLO</h1>
      <button onClick={()=>this.news()}>NEWS</button>
    </div>
    );
  }
}

export default tempComp;
