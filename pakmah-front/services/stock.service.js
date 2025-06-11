import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const fetchStocks = async () => {
    try {
        const { data } = await axios.get("stock", setHeader());
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchStock = async (id) => {
    try {
        const { data } = await axios.get(`stock/${id}`, setHeader());
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const createStock = async (body) => {
    try {
        const { data } = await axios.post("stock", body, setHeader());
        toast.fire({
            icon: "success",
            title: data?.message,
        });
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const updateStock = async (id, body) => {
    try {
        const { data } = await axios.put(`stock/${id}`, body, setHeader());
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};
