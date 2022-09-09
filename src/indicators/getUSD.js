require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

const getUSDWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getUSD = async (...args) => {
    const usd = await memoryCache.wrap("getUSD", function () {
        return getUSDWithoutCache(...args);
    });
    return usd;
};

module.exports = getUSD;
