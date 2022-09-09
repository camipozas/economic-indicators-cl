require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

const getIPCWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getIPC = async (...args) => {
    const ipc = await memoryCache.wrap("getIPC", function () {
        return getIPCWithoutCache(...args);
    });
    return ipc;
};

module.exports = getIPC;
