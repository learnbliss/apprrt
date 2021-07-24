const initialState = {
    token: null
};

export default function auth(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case 1:
            return {
                ...state,

            };
        default:
            return state
    }
}
