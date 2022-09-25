require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const memoryCache = require("../cache");

/**
 * It gets the latest EUR exchange rate from the Chilean Central Bank API
 * @param date - The date you want to get the EUR for.
 * @returns The latest EUR value
 */
const getEURWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/posteriores/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    const [latest] = data.Euros.sort(
        (fecha) => -1 * dayjs().diff(dayjs(fecha["Fecha"]))
    );
    return latest;
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
