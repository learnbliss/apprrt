import {
    CANCEL,
    CONFIRM, DEL_NOTE, DELETE,
    FAILURE, GET_LOCATION, GET_WEATHER,
    LOAD_DAYBOOK,
    NEW_NOTE,
    REQUEST,
    SUCCESS,
    UPLOAD
} from './constants';
import {latitudeSelector, longitudeSelector, noteIdDelNoteModeSelector} from './selectors';

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

export const newNoteEditMode = () => ({type: NEW_NOTE + REQUEST,});
export const newNoteCancel = () => ({type: NEW_NOTE + CANCEL,});

export const addNoteSave = (newNote) => {
    return async (dispatch) => {
        dispatch({type: NEW_NOTE + UPLOAD})
        try {
            await fetch(
                `https://react-purificatio-default-rtdb.firebaseio.com/daybook.json`,
                {
                    method: 'POST',
                    body: JSON.stringify(newNote),
                    headers: {'Content-Type': 'application/json'}
                });
            dispatch({type: NEW_NOTE + SUCCESS})
            dispatch(loadDaybook())
        } catch (err) {
            dispatch({type: NEW_NOTE + FAILURE, payload: {err}})
            console.error(err);
        }
    };
};

export const addNoteConfirm = () => ({type: NEW_NOTE + CONFIRM})

export const delNoteConfirm = (noteId) => ({type: DEL_NOTE + CONFIRM, payload: noteId})
export const cancelNoteConfirm = () => ({type: DEL_NOTE + CANCEL})

export const deleteNote = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const noteId = noteIdDelNoteModeSelector(state)
        dispatch({type: DEL_NOTE + DELETE + REQUEST})
        try {
            await fetch(
                `https://react-purificatio-default-rtdb.firebaseio.com/daybook/${noteId}.json`,
                {
                    method: 'DELETE',
                });
            dispatch({type: DEL_NOTE + DELETE + SUCCESS})
            dispatch(loadDaybook())
        } catch (err) {
            dispatch({type: DEL_NOTE + DELETE + FAILURE, payload: {err}})
            console.error(err);
        }
    };
};

export const getWeather = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const latitude = latitudeSelector(state);
        const longitude = longitudeSelector(state);
        try {
            const weatherData = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=c6c3b539e6d45ebe1f8bbe544d947a0d`)
                .then((res) => res.json());
            console.log('weatherData: ', weatherData);
            dispatch({type: GET_WEATHER, payload: weatherData})
            console.log('getState(): ', getState());
        } catch (err) {
            console.log(err)
        }
    };
};

export const getCoordinates = () => {
    return async (dispatch, getState) => {
        const getCoords = () => {
            return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
        }
        try {
            await getCoords()
                .then(position => {
                    const crd = position.coords;
                    dispatch({type: GET_LOCATION, payload: {latitude: crd.latitude, longitude: crd.longitude}})
                })
                .then(() => dispatch(getWeather()))
        } catch (err) {
            console.error(err);
            dispatch({type: GET_LOCATION + FAILURE, payload: {code: err.code, message: err.message}})
        }
    };
};
