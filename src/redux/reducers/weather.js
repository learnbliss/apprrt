import {FAILURE, GET_LOCATION, GET_WEATHER} from '../constants';

const initialState = {
    latitude: null,
    longitude: null,
    error: null,
    data: null
};

export default function weather (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LOCATION:
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
            };
        case GET_LOCATION + FAILURE:
            return {
                ...state,
                error: payload
            }
        case GET_WEATHER:
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }
}
