import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const fetchQueues = async () => {
  try {
    const { data } = await axios.get("queues", setHeader());
    return data;
  } catch (err) {
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchQueuesnyCondition = async (body) => {
  try {
    const { data } = await axios.post("queues/condition", body, setHeader());
    return data;
  } catch (err) {
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchQueue = async (id) => {
  try {
    const { data } = await axios.get(`queues/${id}`, setHeader());
    return data;
  } catch (err) {
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const createQueue = async (body) => {
  try {
    const { data } = await axios.post("queues", body, setHeader());
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

export const updateQueue = async (id, body) => {
  try {
    const { data } = await axios.put(`queues/${id}`, body, setHeader());
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
