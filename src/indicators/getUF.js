require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

const getUFWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getUF = async (...args) => {
    const uf = await memoryCache.wrap("getUF", function () {
        return getUFWithoutCache(...args);
    });
    return uf;
};

module.exports = getUF;
