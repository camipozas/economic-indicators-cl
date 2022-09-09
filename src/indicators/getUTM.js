require("dotenv").config();
const axios = require("axios");

const memoryCache = require("../cache");

/**
 * It gets the UTM value for a given date from the Central Bank of Chile's API
 * @param date - The date you want to get the UTM for.
 * @returns The UTM value for the given date.
 */
const getUTMWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

/**
 * It returns the UTM parameters from the URL.
 * @param args - The arguments that will be passed to the function that is being cached.
 * @returns The function getUTMWithoutCache is being returned.
 */
const getUTM = async (...args) => {
    const utm = await memoryCache.wrap("getUTM", function () {
        return getUTMWithoutCache(...args);
    });
    return utm;
};

module.exports = getUTM;
