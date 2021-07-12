import { combineReducers } from 'redux';
import daybook from './daybook';
import newNote from './newNote';
import delNote from './delNote';

export default combineReducers({
    daybook,
    newNote,
    delNote,
});
