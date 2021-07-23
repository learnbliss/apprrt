import React, {useEffect} from 'react';
import styles from './Journal.module.scss'
import {connect} from 'react-redux';
import {cancelNoteConfirm, deleteNote, delNoteConfirm, loadDaybook, newNoteEditMode} from '../../redux/actions';
import {
    daybookDateTimeSelector,
    daybookLoadingSelector,
    daybookLoadedSelector,
    errorLoadedSelector, editModeNewNoteSelector, confirmDelNoteModeSelector, loadingDelNoteSelector
} from '../../redux/selectors'
import Loader from '../Loader/Loader';
import Close from '../Close/Close';
import NoteAdd from '../NoteAdd/NoteAdd';
import BlackBackground from '../BlackBackground/BlackBackground';
import Confirm from '../Confirm/Confirm';

const Journal = ({loadDaybook, loading, loaded, daybook, newNoteEditMode, errorLoad, delNoteConfirm, editMode, confirmMode, cancelNoteConfirm, deleteNote, loadingDelNote}) => {
    useEffect(() => {
        if (!loading && !loaded) loadDaybook();
    }, []); //eslint-disable-line

    if (loading) return <Loader/>;

    if (errorLoad === 'Failed to fetch') return <h2 className={styles.error}>ошибка загрузки данных</h2>

    return (
        <>
            <div className={styles.head}>
                <h1>Журнал</h1>
                <button onClick={newNoteEditMode}>Добавить запись</button>
            </div>
            <div className={styles.root}>
                {daybook.map((note, i) => {
                    return (
                        <div key={note.id} className={styles.note}>
                            <div className={styles.noteHead}>
                                <div><b>Запись номер:</b> {i + 1}</div>
                                <div className={styles.close} onClick={() => delNoteConfirm(note.id)}><Close/></div>
                            </div>
                            <div><b>Дата:</b> {note.date}</div>
                            <div><b>Время:</b> {note.time}</div>
                            <div><b>Вспомогательное средство:</b> {note.aid}</div>
                            {note.comment ? <div><b>Комментарий:</b> {note.comment}</div> : null}
                        </div>
                    )
                })}
            </div>
            {editMode ? <NoteAdd/> : null}
            <BlackBackground dark={editMode || confirmMode}/>
            {confirmMode ? <Confirm negativeFn={cancelNoteConfirm} positiveFn={deleteNote} condition={loadingDelNote}/> : null}
        </>
    );
};

export default connect((state) => ({
    daybook: daybookDateTimeSelector(state),
    loading: daybookLoadingSelector(state),
    loaded: daybookLoadedSelector(state),
    errorLoad: errorLoadedSelector(state),
    editMode: editModeNewNoteSelector(state),
    confirmMode: confirmDelNoteModeSelector(state),
    loadingDelNote: loadingDelNoteSelector(state),
}), {loadDaybook, newNoteEditMode, delNoteConfirm, cancelNoteConfirm, deleteNote})(Journal);
