
//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in App.js

import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header/Header';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import NewsBulletin from './components/Content/NewsBulletin/NewsBulletin';
import Info from './containers/Info/Info';
import NewsPage from './containers/NewsPage/NewsPage';
import { CookiesProvider } from 'react-cookie';
import Auth from './containers/Auth/Auth';
//-----------------------------------------------------------------------------------------------------------------
//index.js is the traditional and actual entry point for all node apps. Here in react it just has code of what to render and where to render. 
// App.js has the root component of the react app because every view and component are handled with hierarchy in React, where <App /> is the top most component in hierarchy. 
class App extends Component {  
  render() {
    return (                                     //Component able to render and read routes should be wrapped in BrowserRouter Object.
      <BrowserRouter>
        <CookiesProvider>
          <Header/>
          <Route path="/" exact component={NewsBulletin}/>
          <Switch>
              <Route path="/" exact component={NewsPage}/>
              <Route path="/info" exact component={Info}/>
              <Route path='/auth' exact component={Auth}/>
              <Route render={() => <h2 style={{textAlign:"center", fontWeight:"bold"}}>Page Link Broken!</h2> } />
          </Switch>
        </CookiesProvider>   
      </BrowserRouter>
    );
  }
}
export default App;