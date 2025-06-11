import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const fetchCategories = async () => {
    try {
        const { data } = await axios.get("categories");
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchCategory = async (id) => {
    try {
        const { data } = await axios.get(`categories/${id}`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const createCategory = async (body) => {
    try {
        const { data } = await axios.post(`categories`, body, setHeader());
        toast.fire({
            icon: "success",
            title: data?.message,
        });
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const updateCategory = async (id, body) => {
    try {
        const { data } = await axios.patch(
            `categories/${id}`,
            body,
            setHeader()
        );
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

export const deleteCategory = async (id) => {
    try {
        const { data } = await axios.delete(`categories/${id}`, setHeader());
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
