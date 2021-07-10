import { combineReducers } from 'redux';
import daybook from './daybook';
import newNote from './newNote';

export default combineReducers({
    daybook,
    newNote,
});
