import React from 'react';
import styles from './App.module.scss'
// import Login from '../Login/Login';
import Journal from '../Journal/Journal';
import NoteAdd from '../NoteAdd/NoteAdd';
import BlackBackground from '../BlackBackground/BlackBackground';
import {connect} from 'react-redux';
import {editModeNewNoteSelector} from '../../redux/selectors';

const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.wrapp}>
                {/*<Login/>*/}
                <Journal/>
            </div>
        </div>
    )
}

export default App;
