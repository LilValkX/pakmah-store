export const config = (state = {}, action) => {
    switch (action.type) {
        case "LOADCONFIG":
            return action.payload;
        default:
            return state;
    }
};

export default config;
