require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

const getUTMWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getUTM = async (...args) => {
    const utm = await memoryCache.wrap("getUTM", function () {
        return getUTMWithoutCache(...args);
    });
    return utm;
};

module.exports = getUTM;
