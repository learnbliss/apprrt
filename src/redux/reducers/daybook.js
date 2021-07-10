import {FAILURE, LOAD_DAYBOOK, NEW_NOTE, REQUEST, SAVE, SUCCESS} from '../constants';

const initialState = {
    entities: [],
    loading: false,
    loaded: false,
    error: null,
};

export default function daybook (state = initialState, action) {
    const {type, payload} = action;
    console.log('payload.daybook: ', payload);
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
                entities: [...state.entities, ...Object.values(payload.daybook)],
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
        case NEW_NOTE + SAVE:  // вынесено в этот редьюсер чтобы сохранить в локальный стейт, не делая лишнего api запроса
            return {
                ...state,
                entities: [...state.entities, payload.newNote]
            }
        default:
            return state
    }
}
