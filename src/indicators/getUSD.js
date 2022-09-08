require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");
const today = require("../date");

const getUSDWithoutCache = async () => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/${today}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getUSD = async () => {
    const uf = await memoryCache.wrap("getUSD", function () {
        return getUSDWithoutCache();
    });
    return uf;
};

module.exports = getUSD;
