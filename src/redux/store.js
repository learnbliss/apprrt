import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';
import {routerMiddleware} from 'connected-react-router';
import history from '../history'

const enhancer = applyMiddleware(
    thunk,
    routerMiddleware(history),
);

export default createStore(reducers, composeWithDevTools(enhancer));
