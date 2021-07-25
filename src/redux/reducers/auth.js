import {AUTHENTICATION, LOGOUT, SUCCESS} from '../constants';

const initialState = {
    token: null,
    email: null
};

export default function auth(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case AUTHENTICATION + SUCCESS:
            return {
                ...state,
                token: payload.token,
                email: payload.email
            };
        case AUTHENTICATION + LOGOUT:
            return {
                ...state,
                token: null,
                email: null
            }
        default:
            return state
    }
}
