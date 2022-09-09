require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

const getEURWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getEUR = async (...args) => {
    const euro = await memoryCache.wrap("getEUR", function () {
        return getEURWithoutCache(...args);
    });
    return euro;
};

module.exports = getEUR;
