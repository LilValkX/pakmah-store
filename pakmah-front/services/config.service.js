import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const getconfigure = async () => {
    try {
        const { data } = await axios.get(`configure`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const loadconfig = () => {
    return async (dispatch) => {
        dispatch({
            type: "LOADCONFIG",
            payload: await getconfigure(),
        });
    };
};

export const updateconfigure = async (body) => {
    try {
        const { data } = await axios.patch("configure", body, setHeader());
        toast.fire({
            icon: "success",
            title: data.message,
        });
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const updateconfigurevipserver = async (body) => {
    try {
        const { data } = await axios.patch(
            "configure/vipserver",
            body,
            setHeader()
        );
        toast.fire({
            icon: "success",
            title: data.message,
        });
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};
