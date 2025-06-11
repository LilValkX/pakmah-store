import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const fetchProductswithCategory = async () => {
    try {
        const { data } = await axios.get("products/category");
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchProducts = async () => {
    try {
        const { data } = await axios.get(`products`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchProduct = async (id) => {
    try {
        const { data } = await axios.get(`products/${id}`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchProductQuantity = async (id) => {
    try {
        const { data } = await axios.get(`products/quantity/${id}`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const fetchBestsellerProduct = async () => {
    try {
        const { data } = await axios.get(`products/bestseller`);
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const updateProduct = async (id, body) => {
    try {
        const { data } = await axios.patch(`products/${id}`, body, setHeader());
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

export const deleteProduct = async (id) => {
    try {
        const { data } = await axios.delete(`products/${id}`, setHeader());
        toast.fire({
            icon: "success",
            title: "ลบสำเร็จ",
        });
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};

export const createProduct = async (body) => {
    try {
        const { data } = await axios.post(`products`, body, setHeader());
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

export const buyProduct = async (body) => {
    try {
        const { data } = await axios.post(`products/buy`, body, setHeader());
        toast.fire({
            icon: "success",
            title: "ซื้อสินค้าสำเร็จ",
        });
        return data;
    } catch (err) {
        toast.fire({
            icon: "error",
            title: err.response?.data.message,
        });
    }
};
