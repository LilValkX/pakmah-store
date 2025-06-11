// import toast from "../../lib/toast";

const initialState = {
    accesstoken:
        typeof window !== "undefined" && localStorage.getItem("accesstoken"),
    member: {
        _id: null,
        name: null,
        email: null,
        roles: null,
    },
    authenticate: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHENTICATION":
            return {
                ...initialState,
                accesstoken: action.payload.accesstoken,
                member: action.payload.member,
            };
        case "SIGNOUT":
            localStorage.clear();
            return {
                accesstoken: null,
                member: {
                    id: null,
                    name: null,
                    email: null,
                    roles: null,
                },
                authenticate: false,
            };
        case "LOADMEMBER":
            if (!action.payload.member) {
                return {
                    ...initialState,
                    accesstoken: action.payload.accesstoken,
                };
            }
            return {
                ...initialState,
                accesstoken: action.payload.accesstoken,
                member: action.payload.member,
            };
        default:
            return state;
    }
};

export default auth;
