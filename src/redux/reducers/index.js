import { combineReducers } from 'redux';
import daybook from './daybook';
import newNote from './newNote';
import delNote from './delNote';
import {connectRouter} from "connected-react-router";
import history from '../../history';
import weather from './weather';

export default combineReducers({
    router: connectRouter(history),
    daybook,
    newNote,
    delNote,
    weather,
});
