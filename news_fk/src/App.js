import React, { Component } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './App.css';
import Header from './components/Header/Header';
import BottomLoader from './components/Content/BottomLoader/BottomLoader';
import DisplayNewsCards from './components/Content/DisplayNewsCards/DispalyNewsCards';
import FetchErrorHandler from './components/Content/FetchErrorHandler/FetchErrorHandler';
import InitialLoader from './components/Content/InitialLoader/InitialLoader';
import {BrowserRouter,Route} from 'react-router-dom';
import NewsBulletin from './components/Content/NewsBulletin/NewsBulletin';
import Info from './components/Info/Info';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';

class App extends Component {
  // state = {
  //   initial_loading : true,
  //   should_load : false,
  //   currpage : 1,
  //   countrycode : "in",
  //   newscategory : "General",
  //   newsarticles : [],
  //   end_of_article : false,
  //   error_found : false
  // }

  // newsHandler = () => {
  //   if(!this.props.end_of_article) {
  //     // this.setState({should_load : false});
  //     this.props.setShouldLoad(false);
  //     // const url = `http://newsapi.org/v2/top-headlines?country=${this.state.countrycode}&category=${this.state.newscategory}&pageSize=${API_PAGE_SIZE}&page=${this.state.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;
  //     const url = `http://newsapi.org/v2/top-headlines?country=${this.props.countrycode}&category=${this.props.newscategory}&pageSize=${API_PAGE_SIZE}&page=${this.props.currpage}&apiKey=8115e82c195f445ebba7f0beeeb524e2`;
  //     fetch(url)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(fin => {
  //       this.props.setInitialLoading(false);
  //       this.props.setNewsArticles([...this.props.newsarticles , ...fin.articles]);
  //       this.props.setShouldLoad(true);
  //       // this.setState({
  //       //   initial_loading : false,
  //       //   newsarticles : [...this.props.newsarticles , ...fin.articles],
  //       //   should_load : true
  //       // })
  //       if(fin.articles.length < API_PAGE_SIZE) {
  //         this.props.setEndOfArticle(true);
  //         //this.setState({end_of_article : true})
  //         console.log("triggered");
  //       }else{
  //         this.props.setCurrPage(this.props.currpage + 1);
  //       }
  //     })
  //     .catch(err => {
  //       // this.setState({error_found : true})
  //       this.props.setErrorFound(true);
  //     })
  
  //     // this.setState((prevState,props) => {
  //     //   return {
  //     //     currpage : prevState.currpage+1
  //     //   }
  //     // });
      
  //   }
  // }


  countryChangeHandler = (event) => {
    // this.setState({
    //   initial_loading : true,
    //   countrycode : event.target.value,
    //   currpage : 1,
    //   newsarticles : [],
    //   should_load : false,
    //   end_of_article : false,
    //   error_found : false
    // }
    // , this.newsHandler);
    this.props.setInitialLoading(true);
    this.props.setCountryCode(event.target.value);
    this.props.setCurrPage(1);
    this.props.setNewsArticles([]);
    this.props.setShouldLoad(false);
    this.props.setEndOfArticle(false);
    this.props.setErrorFound(false);

    this.props.newsHandler();;
  }
  categoryChangeHandler = (event) => {
    // this.setState({
    //   initial_loading : true,
    //   newscategory : event.target.value,
    //   currpage : 1,
    //   newsarticles : [],
    //   should_load : false,
    //   end_of_article : false,
    //   error_found : false
    // }, this.newsHandler);
    this.props.setInitialLoading(true);
    this.props.setNewsCategory(event.target.value);
    this.props.setCurrPage(1);
    this.props.setNewsArticles([]);
    this.props.setShouldLoad(false);
    this.props.setEndOfArticle(false);
    this.props.setErrorFound(false);

    this.props.newsHandler();;
  }

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
          <Header 
            country={this.props.countrycode}
            category={this.props.newscategory}
            countryChangeHandler={this.countryChangeHandler}
            categoryChangeHandler={this.categoryChangeHandler}
          />
          <NewsBulletin/>
          <Route path="/" exact component={this.Display}/>
          <Route path="/info" exact component={Info}/>
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
    currpage : state.currpage,
    countrycode : state.countrycode,
    newscategory : state.newscategory,
    newsarticles : state.newsarticles,
    end_of_article : state.end_of_article,
    error_found : state.error_found
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setInitialLoading : (newVal) => dispatch(actionTypes.setInitialLoading(newVal)),
      setShouldLoad : (newVal) => dispatch({type : actionTypes.SET_SHOULD_LOAD, val : newVal}),
      setCurrPage : (newVal) => dispatch({type : actionTypes.SET_CURR_PAGE, val : newVal}),
      setCountryCode : (newVal) => dispatch({type : actionTypes.SET_COUNTRY_CODE, val : newVal}),
      setNewsCategory : (newVal) => dispatch({type : actionTypes.SET_NEWS_CATEGORY, val : newVal}),
      setNewsArticles : (newVal) => dispatch({type : actionTypes.SET_NEWS_ARTICLES, val : newVal}),
      setEndOfArticle : (newVal) => dispatch({type : actionTypes.SET_END_OF_ARTICLE, val : newVal}),
      setErrorFound : (newVal) => dispatch({type : actionTypes.SET_ERROR_FOUND, val : newVal}),
      newsHandler : () => dispatch(actionTypes.newsHandler())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
