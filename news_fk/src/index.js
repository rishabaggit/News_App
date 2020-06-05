import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, combineReducers ,compose} from 'redux'
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import newsFetchReducer from './store/reducers/newsFetchReducer';
import authReducer from './store/reducers/authReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';

const rootReducer = combineReducers({
    newsFetchReducer : newsFetchReducer,
    auth : authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <CookiesProvider>
                            <App />
                        </CookiesProvider>
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();