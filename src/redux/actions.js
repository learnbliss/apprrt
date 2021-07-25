import {
    AUTHENTICATION,
    CANCEL,
    CONFIRM, DEL_NOTE, DELETE,
    FAILURE, GET_LOCATION, GET_WEATHER,
    LOAD_DAYBOOK, LOGOUT,
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
    return async (dispatch) => {
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

export const auth = ({email, password}, isLogin) => {
    const userData = {
        email,
        password,
        returnSecureToken: true
    };
    const apiKey = 'AIzaSyAks4VT1Wc0s4YCTCzaDuWGA9l1fdKIJOw';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }
    return async (dispatch) => {
        dispatch({type: AUTHENTICATION + REQUEST})
        try {
            const response = await fetch(url + apiKey, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            const {idToken, localId, expiresIn, email} = response;
            const expireTime = new Date(new Date().getTime() + expiresIn * 1000)

            localStorage.setItem('token', idToken);
            localStorage.setItem('userId', localId)
            localStorage.setItem('expireTime', expireTime)
            localStorage.setItem('email', email)

            dispatch(authSuccess(idToken, email))
            dispatch(autoLogout(expiresIn))

        } catch (err) {
            console.error(err);
        }
    };
};

export const authSuccess = (token, email) => ({type: AUTHENTICATION + SUCCESS, payload: {token, email}})

export const autoLogout = (time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expireTime');
        localStorage.removeItem('email');
        dispatch({type: AUTHENTICATION + LOGOUT})
    };
};

export const autoLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const expireTime = new Date(localStorage.getItem('expireTime'))
        if (!token || expireTime <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess())
            dispatch(autoLogout((expireTime.getTime() - new Date().getTime()) / 1000))
        }
        dispatch(authSuccess(token, email))
    };
};
