import axios from "../lib/axios";
import toast from "../lib/toast";

export const signin = (credentials) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("auth/signin", credentials);
            const accesstoken = data.accesstoken;
            localStorage.setItem("accesstoken", accesstoken);
            toast.fire({
                icon: "success",
                title: "เข้าสู่ระบบเรียบร้อย",
            });

            dispatch({
                type: "AUTHENTICATION",
                payload: {
                    accesstoken,
                    member: await profile(),
                },
            });
        } catch (err) {
            toast.fire({
                icon: "error",
                title: err.response?.data.message,
            });
        }
    };
};

export const signup = (credentials) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("auth/signup", credentials);
            const accesstoken = data.accesstoken;
            localStorage.setItem("accesstoken", accesstoken);
            toast.fire({
                icon: "success",
                title: "สมัครสมาชิกเรียบร้อย",
            });

            dispatch({
                type: "AUTHENTICATION",
                payload: {
                    accesstoken,
                    member: await profile(),
                },
            });
        } catch (err) {
            toast.fire({
                icon: "error",
                title: err.response?.data.message,
            });
        }
    };
};

export const signout = () => {
    return async (dispatch) => {
        toast.fire({
            icon: "success",
            title: "ลาก่อย",
        });

        dispatch({
            type: "SIGNOUT",
            payload: null,
        });
    };
};

export const loadmember = () => {
    return async (dispatch, getState) => {
        const accesstoken = getState().auth.accesstoken;
        if (accesstoken) {
            dispatch({
                type: "LOADMEMBER",
                payload: {
                    accesstoken,
                    member: await profile(),
                },
            });
        }
        return null;
    };
};

export const profile = async () => {
    try {
        const { data } = await axios.get("auth/profile", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("accesstoken"),
            },
        });
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
        // return {
        //     member: {
        //         id: null,
        //         name: null,
        //         email: null,
        //         roles: null,
        //     },
        // };
    }
};
