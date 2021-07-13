import {CANCEL, CONFIRM, FAILURE, DEL_NOTE, REQUEST, SUCCESS, UPLOAD} from '../constants';

const initialState = {
    confirmMode: false,
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
            }
        // case DEL_NOTE + CANCEL:
        //     return {
        //         ...state,
        //         dark: false,
        //         confirmMode: false,
        //     }
        // case DEL_NOTE + UPLOAD:
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        // case DEL_NOTE + SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         loaded: true,
        //         dark: false,
        //         confirmMode: false,
        //     }
        // case DEL_NOTE + FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         loaded: false,
        //         dark: false,
        //         confirmMode: false,
        //         error: payload.error
        //     }
        default:
            return state
    }
}
