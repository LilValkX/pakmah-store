import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://api.pakmah.gay/api",
});

export const setHeader = () => {
    const header = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("accesstoken"),
        },
    };
    return header;
};

export default axios;
