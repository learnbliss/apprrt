import React from 'react';
import styles from './NoteAdd.module.scss'
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {addNoteConfirm, addNoteSave, newNoteCancel} from '../../redux/actions';
import Loader from '../Loader/Loader';
import {errorNewNoteSelector, loadedNewNoteSelector, loadingNewNoteSelector} from '../../redux/selectors';

const NoteAdd = ({addNoteSave, newNoteCancel, loadingNewNote, loadedNewNote, addNoteConfirm, errorNewNote}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = handleSubmit(data => {
        addNoteSave(data)
    });
    return (
        <div className={styles.root}>
            <h1>Добавить запись</h1>
            <form className={styles.head} onSubmit={onSubmit}>
                <label className={styles.label}>
                    <span>{'Время'}</span>
                    <input type={'time'} {...register('time', {required: true})} />
                    {errors.time?.type === 'required' && <span className={styles.error}>Поле не заполнено</span>}
                </label>
                <label className={styles.label}>
                    <span>{'Дата'}</span>
                    <input type={'date'} {...register('date', {required: true})} />
                    {errors.date?.type === 'required' && <span className={styles.error}>Поле не заполнено</span>}
                </label>
                <label className={styles.label}>
                    <span>{'Вспомогательное средство?'}</span>
                    <input type={'text'} {...register('aid', {required: true})} />
                </label>
                <label className={styles.label}>
                    <span>{'Комментарий'}</span>
                    <textarea maxLength={150} {...register('comment', {maxLength: 150})} />
                    {errors.comment?.type === 'maxLength' &&
                    <span className={styles.error}>Слишком длинный комментарий (макс 150 символов)</span>}
                </label>
                <div className={styles.buttons}>
                    <button type={'submit'} onClick={onSubmit}>Сохранить запись</button>
                    <button onClick={newNoteCancel}>Отмена</button>
                </div>
            </form>
            {loadingNewNote ? <div className={styles.loader}><Loader/></div> : null}
            {!loadingNewNote && loadedNewNote && !errorNewNote ?
                <div className={styles.loader}>Запись добавлена <button onClick={addNoteConfirm}>Ok</button>
                </div> : null}
            {errorNewNote ? <div>{errorNewNote}</div> : null}
        </div>
    );
};

export default connect(state => ({
    loadingNewNote: loadingNewNoteSelector(state),
    loadedNewNote: loadedNewNoteSelector(state),
    errorNewNote: errorNewNoteSelector(state),
}), {addNoteSave, newNoteCancel, addNoteConfirm})(NoteAdd);
