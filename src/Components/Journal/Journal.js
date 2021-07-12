import React, {useEffect} from 'react';
import styles from './Journal.module.scss'
import {connect} from 'react-redux';
import {delNoteConfirm, loadDaybook, newNoteEditMode} from '../../redux/actions';
import {
    daybookDateTimeSelector,
    daybookLoadingSelector,
    daybookLoadedSelector,
    errorLoadedSelector
} from '../../redux/selectors'
import Loader from '../Loader/Loader';
import Close from '../Close/Close';

const Journal = ({loadDaybook, loading, loaded, daybook, newNoteEditMode, errorLoad, delNoteConfirm}) => {

    useEffect(() => {
        if (!loading && !loaded) loadDaybook();
    }, []); //eslint-disable-line

    if (loading) return <Loader/>;

    if (errorLoad) return <h2 className={styles.errorLoad}>ошибка загрузки данных</h2>

    return (
        <>
            <div className={styles.head}>
                <h1>Журнал</h1>
                <button onClick={newNoteEditMode}>Добавить запись</button>
            </div>
            <div className={styles.root}>
                {daybook.map((note, i) => {
                    return (
                        <div key={note.id}>
                            <div className={styles.noteHead}>
                                <div><b>Запись номер:</b> {i + 1}</div>
                                <div><Close onClick={delNoteConfirm}/></div>
                            </div>
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
    errorLoad: errorLoadedSelector(state),
}), {loadDaybook, newNoteEditMode, delNoteConfirm})(Journal);
