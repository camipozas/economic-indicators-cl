require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");
const today = require("../date");

const getEURWithoutCache = async () => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/${today}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

const getEUR = async () => {
    const uf = await memoryCache.wrap("getEUR", function () {
        return getEURWithoutCache();
    });
    return uf;
};

module.exports = getEUR;
