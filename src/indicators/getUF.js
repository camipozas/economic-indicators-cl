require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

/**
 * It gets the UF value for a given date from the CMF API
 * @param date - The date you want to get the UF value for.
 * @returns The data is being returned.
 */
const getUFWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

/**
 * It returns the UF from the cache if it exists, otherwise it calls the getUFWithoutCache function and
 * returns the result.
 * @param args - The arguments that will be passed to the function.
 * @returns A function that returns a promise.
 */
const getUF = async (...args) => {
    const uf = await memoryCache.wrap("getUF", function () {
        return getUFWithoutCache(...args);
    });
    return uf;
};

module.exports = getUF;
