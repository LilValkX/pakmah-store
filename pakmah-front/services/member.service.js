import axios, { setHeader } from "../lib/axios";
import toast from "../lib/toast";

export const fetchMembers = async () => {
  try {
    const { data } = await axios.get("members", setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchMember = async (id) => {
  try {
    const { data } = await axios.get(`members/${id}`, setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const updateMember = async (id, body) => {
  try {
    const { data } = await axios.put(`members/${id}`, body, setHeader());
    toast.fire({
      icon: "success",
      title: "อัพเดทสำเร็จ",
    });
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const topupMember = async (link) => {
  try {
    const { data } = await axios.post(`members/topup`, { link }, setHeader());
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

export const fetchHistoryRobux = async () => {
  try {
    const { data } = await axios.post("members/historyrobux", {}, setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchHistoryToycode = async () => {
  try {
    const { data } = await axios.post(
      "members/historytoycode",
      {},
      setHeader()
    );
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchHistoryTopup = async () => {
  try {
    const { data } = await axios.post("members/historytopup", {}, setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchIncomeMoneyforMonth = async () => {
  try {
    const { data } = await axios.post("members/income/month", {}, setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};

export const fetchIncomeMoneyTopup = async () => {
  try {
    const { data } = await axios.post("members/income/topup", {}, setHeader());
    return data;
  } catch (err) {
    console.log(err);
    toast.fire({
      icon: "error",
      title: err.response?.data.message,
    });
  }
};
