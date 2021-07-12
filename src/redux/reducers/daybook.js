import {FAILURE, LOAD_DAYBOOK, LOAD_LAST_DAYBOOK, REQUEST, SUCCESS} from '../constants';
import {normalizeView} from '../../utils/utils';

const initialState = {
    entities: [],
    loading: false,
    loaded: false,
    error: null,
};

export default function daybook (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case LOAD_DAYBOOK + REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOAD_DAYBOOK + SUCCESS:
            return {
                ...state,
                entities: normalizeView(payload.daybook),
                loading: false,
                loaded: true,
            };
        case LOAD_DAYBOOK + FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: payload.error,
            };
        // case LOAD_LAST_DAYBOOK:
        //     return {
        //         ...state,
        //
        //     }
        default:
            return state
    }
}
