import React, {useEffect} from 'react';
import styles from './Journal.module.scss'
import {connect} from 'react-redux';
import {loadDaybook, newNoteEditMode} from '../../redux/actions';
import {daybookDateTimeSelector, daybookLoadingSelector, daybookLoadedSelector} from '../../redux/selectors'
import Loader from '../Loader/Loader';

const Journal = ({loadDaybook, loading, loaded, daybook, newNoteEditMode}) => {

    useEffect(() => {
        if (!loading && !loaded) loadDaybook();
    }, []); //eslint-disable-line

    if (loading) return <Loader/>;

    return (
        <>
            <div className={styles.head}>
                <h1>Журнал</h1>
                <button onClick={newNoteEditMode}>Добавить запись</button>
            </div>
            <div className={styles.root}>
                {daybook.map((note, i) => {
                    return (
                        <div key={i}>
                            <div><b>Запись номер:</b> {i + 1}</div>
                            <div><b>Дата:</b> {note.date}</div>
                            <div><b>Время:</b> {note.time}</div>
                            <div><b>Вспомогательное средство:</b> {note.aid}</div>
                            {note.comment ? <div><b>Комментарий:</b> {note.comment}</div> : null}
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default connect((state) => ({
    daybook: daybookDateTimeSelector(state),
    loading: daybookLoadingSelector(state),
    loaded: daybookLoadedSelector(state),
}), {loadDaybook, newNoteEditMode})(Journal);
