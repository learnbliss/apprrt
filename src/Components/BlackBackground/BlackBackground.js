import React from 'react';
import styles from './BlackBackground.module.scss'
import {connect} from 'react-redux';
import {newNoteBackgroundSelector} from '../../redux/selectors';

const BlackBackground = ({dark}) => {
    return (
        <>
            {dark ? <div className={styles.dark}></div> : null}
        </>
    );
};

export default connect(state => ({
    dark: newNoteBackgroundSelector(state),
}))(BlackBackground);
