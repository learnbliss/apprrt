import {CANCEL, CONFIRM, FAILURE, NEW_NOTE, REQUEST, SUCCESS, UPLOAD} from '../constants';

const initialState = {
    editMode: false,
    loading: false,
    loaded: false,
    error: null,
};

export default function newNote (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case NEW_NOTE + REQUEST:
            return {
                ...state,
                editMode: true,
            }
        case NEW_NOTE + CANCEL:
            return {
                ...state,
                editMode: false,
            }
        case NEW_NOTE + UPLOAD:
            return {
                ...state,
                loading: true,
            }
        case NEW_NOTE + SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
            }
        case NEW_NOTE + CONFIRM:
            return {
                ...state,
                editMode: false,
                loaded: false,
            }
        case NEW_NOTE + FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: payload.error
            }
        default:
            return state
    }
}
