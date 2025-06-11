import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const firststep = async (body) => {
    try {
        const { data } = await axios.post(
            "vipserver/firststep",
            body,
            setHeader()
        );
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const laststep = async (body) => {
    try {
        const { data } = await axios.post(
            "vipserver/laststep",
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
