import {AUTHENTICATION, LOGOUT, REQUEST, SUCCESS} from '../constants';

const initialState = {
    token: null,
    email: null,
    request: false
};

export default function auth(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case AUTHENTICATION + REQUEST:
            return {
                ...state,
                request: true
            }
        case AUTHENTICATION + SUCCESS:
            return {
                ...state,
                token: payload.token,
                email: payload.email,
                request: false
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
