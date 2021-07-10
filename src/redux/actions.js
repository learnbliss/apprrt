import {
    CANCEL,
    CONFIRM,
    FAILURE,
    LOAD_DAYBOOK,
    NEW_NOTE,
    REQUEST,
    SAVE,
    SUCCESS,
    UPLOAD
} from './constants';

export const loadDaybook = () => async (dispatch) => {
    dispatch({type: LOAD_DAYBOOK + REQUEST});
    try {
        const daybook = await fetch(
            `https://react-purificatio-default-rtdb.firebaseio.com/daybook.json`)
            .then((res) => res.json());
        dispatch({type: LOAD_DAYBOOK + SUCCESS, payload: {daybook}});
    } catch (error) {
        console.log('error: ', error);
        dispatch({type: LOAD_DAYBOOK + FAILURE, payload: {error}});
    }
};

export const newNoteEditMode = () => {
    return {
        type: NEW_NOTE + REQUEST,
    }
};

export const newNoteCancel = () => {
    return {
        type: NEW_NOTE + CANCEL,
    }
};

export const addNoteSave = (newNote) => {
    return async (dispatch, getState) => {
        dispatch({type: NEW_NOTE + UPLOAD})
        console.log('newNote: ', newNote);
        try {
            await fetch(
                `https://react-purificatio-default-rtdb.firebaseio.com/daybook.json`,
                {
                    method: 'POST',
                    body: JSON.stringify(newNote),
                    headers: {'Content-Type': 'application/json'}
                });
            dispatch({type: NEW_NOTE + SUCCESS})
            dispatch({type: NEW_NOTE + SAVE, payload: {newNote}})
        } catch (err) {
            dispatch({type: NEW_NOTE + FAILURE, payload: {err}})
            console.error(err);
        }
    };
};

export const addNoteConfirm = () => {
    return {
        type: NEW_NOTE + CONFIRM
    }
}
