import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, combineReducers ,compose} from 'redux'
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import newsFetchReducer from './store/reducers/newsFetchReducer';
import authReducer from './store/reducers/authReducer';
import appModeReducer from './store/reducers/appModeReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';

const rootReducer = combineReducers({
    newsFetchReducer : newsFetchReducer,
    auth : authReducer,
    appModeReducer : appModeReducer
});

export type RootState = ReturnType<typeof rootReducer>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <CookiesProvider>
                            <App />
                        </CookiesProvider>
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();