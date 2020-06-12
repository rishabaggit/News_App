import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { RootState } from 'index';
import { ModeColors } from 'colors';
import { Cookies } from 'react-cookie';
import { newsHandler } from '../../store/actions/index';
import BottomLoader from '../../components/UI/BottomLoader/BottomLoader';
import DisplayNewsCardsDB from '../../components/DisplayNewsCards/DisplayNewsCardsDB';
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler';
import InitialLoader from '../../components/UI/InitialLoader/InitialLoader';

interface NewsArticle {
  urlToImage: string,
  url: string,
  title: string,
  description: string
}
interface NewsPageProps {
  cookies: Cookies;
  should_load: boolean;
  newsHandler: () => void;
  error_found: boolean;
  initial_loading: boolean;
  userId: string;
  newsarticles: Array<NewsArticle>;
  colorsObj: ModeColors;
  end_of_article: boolean;
}

class NewsPage extends Component<NewsPageProps> {
  componentDidMount = () => {
    this.props.newsHandler();
  }
  onBottomHandler = () => {
    if (this.props.should_load && window.location.pathname === '/') {
      this.props.newsHandler();
    }
  }
  Display = () => {
    if (this.props.error_found) {
      return <FetchErrorHandler />;
    }
    else if (this.props.initial_loading) {
      return <InitialLoader />;
    }
    else {
      return (
        <div>
          <DisplayNewsCardsDB
            articles={this.props.newsarticles}
            cookies={this.props.cookies}
            colorsObj={this.props.colorsObj}
          />
          <BottomLoader load={!this.props.end_of_article} />
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.Display()}
        <BottomScrollListener onBottom={this.onBottomHandler} />
      </div>
    );
  }
}
const mapStateToProps = (state: RootState, ownProps: { cookies: Cookies }) => {
  return {
    initial_loading: state.newsFetchReducer.initial_loading,
    should_load: state.newsFetchReducer.should_load,
    newsarticles: state.newsFetchReducer.newsarticles,
    end_of_article: state.newsFetchReducer.end_of_article,
    error_found: state.newsFetchReducer.error_found,
    colorsObj: state.appModeReducer.colorsObj,
    cookies: ownProps.cookies,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    newsHandler: () => dispatch(newsHandler())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
