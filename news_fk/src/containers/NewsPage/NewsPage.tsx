import React, { Component } from 'react';
import BottomLoader from '../../components/UI/BottomLoader/BottomLoader';
import DisplayNewsCardsDB from '../../components/DisplayNewsCards/DisplayNewsCardsDB';
import DisplayNewsCards from '../../components/DisplayNewsCards/DisplayNewsCards';
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler';
import InitialLoader from '../../components/UI/InitialLoader/InitialLoader';
import {connect} from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {newsHandler} from '../../store/actions/index';
import { RootState } from 'index';
// import NewsBulletin from '../../components/Content/NewsBulletin/NewsBulletin';


interface NewsPageProps{
  cookies:any;
  should_load: boolean;
  newsHandler: any;
  error_found: boolean;
  initial_loading: boolean;
  userId: string;
  newsarticles: any;
  colorsObj: any;
  end_of_article: boolean;
}

class NewsPage extends React.Component<NewsPageProps> {

    constructor(props: NewsPageProps) {
        super(props);
        
        if((this.props.cookies).get('Like') === null || (this.props.cookies).get('Like') === undefined )
          {
            (this.props.cookies).set('Like',[],{path: '/'})
          }
    }
    onBottomHandler = () => {                     //Arrow Function Executed Upon Reaching the bottom of entire screen                   
        if(this.props.should_load && window.location.pathname === '/') {
            this.props.newsHandler();                //Invoke news handler if should_load is true because user has hit bottom for the first time.
        }
    }
    Display = () => {
        if(this.props.error_found) {                // Render FetchErrorHandler Component to display Error Sign in Components Folder if error_found set to true.
          return <FetchErrorHandler/>;
        }
        else if(this.props.initial_loading) {       // Render InitialLoader Component to display rotating Spinner in Components Folder if page loaded for first time.
          return <InitialLoader/>;
        }
        else {                                      //Render DispalyNewsCards to display news article and BottomLoader to display loader in other cases
          if(this.props.userId) {
            return (
              <div>
                  <DisplayNewsCardsDB articles={this.props.newsarticles} cookies={this.props.cookies} colorsObj = {this.props.colorsObj}/>  
                  <BottomLoader load={!this.props.end_of_article} />
              </div>
            );
          }
          else {
            return (
              <div>
                  <DisplayNewsCards articles={this.props.newsarticles} cookies={this.props.cookies} colorsObj = {this.props.colorsObj}/>  
                  <BottomLoader load={!this.props.end_of_article} />
              </div>
            );
          }
        }
      }
      render() {
        return (
            <div>
            {this.Display()}
            <BottomScrollListener onBottom={this.onBottomHandler}/>  
            </div>
            );
      }
      componentDidMount = () => {
        this.props.newsHandler();
      }

}
const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
      initial_loading : state.newsFetchReducer.initial_loading,
      should_load : state.newsFetchReducer.should_load,
      newsarticles : state.newsFetchReducer.newsarticles,
      end_of_article : state.newsFetchReducer.end_of_article,
      error_found : state.newsFetchReducer.error_found,
      colorsObj : state.appModeReducer.colorsObj,
      cookies: ownProps.cookies,
      userId : state.auth.userId
    };
  };
  
  
  //mapDispatchToProps() is a utility which will help your component to fire an action event newshandler with action: newshandler() and no payload.
  
  const mapDispatchToProps = (dispatch:any) => {
    return {
        newsHandler : () => dispatch(newsHandler())
    }
  };
  
  //-----------------------------------------------------------------------------------------------------------------
  //Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.
  
  export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
  