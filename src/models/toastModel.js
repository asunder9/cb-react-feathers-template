export const toast = {
    state: {
        type: null,
        title: null,
        message: null,
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        update(state, newState) {
            return { ...state, ...newState };
        },
        alert(state, data) {
            return { ...state, ...data };
        },
    },
    effects: (dispatch) => ({}),
};
