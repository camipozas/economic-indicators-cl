require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

/**
 * It makes a request to the CMF API and returns the data
 * @param date - The date you want to get the EUR for.
 * @returns The data is being returned.
 */
const getEURWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

/**
 * It returns the value of the euro.
 * @param args - The arguments that will be passed to the function that is being cached.
 * @returns The function getEURWithoutCache is being returned.
 */
const getEUR = async (...args) => {
    const euro = await memoryCache.wrap("getEUR", function () {
        return getEURWithoutCache(...args);
    });
    return euro;
};

module.exports = getEUR;
