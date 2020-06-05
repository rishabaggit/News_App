import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import newsFetchReducer from './store/reducers/newsFetchReducer';
import authReducer from './store/reducers/newsFetchReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    newsFetchReducer : newsFetchReducer,
    authReducer : authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();