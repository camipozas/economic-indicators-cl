require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const memoryCache = require("../cache");

/**
 * It gets the latest UTM value from the Chilean Central Bank's API
 * @param date - The date you want to get the UTM for.
 * @returns The latest UTM value
 */
const getUTMWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/posteriores/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    const [latest] = data.UTMs.sort(
        (fecha) => -1 * dayjs().diff(dayjs(fecha["Fecha"]))
    );
    return latest;
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
