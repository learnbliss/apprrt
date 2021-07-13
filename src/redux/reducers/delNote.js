import {CANCEL, CONFIRM, FAILURE, DEL_NOTE, REQUEST, SUCCESS, DELETE} from '../constants';

const initialState = {
    confirmMode: false,
    noteId: null,
    loading: false,
    loaded: false,
    error: null,
};

export default function delNote(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case DEL_NOTE + CONFIRM:
            return {
                ...state,
                confirmMode: true,
                noteId: payload,
            }
        case DEL_NOTE + CANCEL:
            return {
                ...state,
                confirmMode: false,
            }
        case DEL_NOTE + DELETE + REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DEL_NOTE + DELETE + SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                confirmMode: false,
                noteId: null,
            }
        case DEL_NOTE + DELETE + FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                confirmMode: false,
                error: payload.error
            }
        default:
            return state
    }
}
