require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const memoryCache = require("../cache");

/**
 * It makes a request to the CMF API and returns the data
 * @param date - The date you want to get the USD value for.
 * @returns The data is being returned.
 */
const getUSDWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/posteriores/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    const [latest] = data.Dolares.sort(
        (fecha) => -1 * dayjs().diff(dayjs(fecha["Fecha"]))
    );
    return latest;
};

/**
 * GetUSD() is a function that returns the USD value of a given currency, and it uses a cache to store
 * the USD value of the currency for a given amount of time.
 * @param args - The arguments to pass to the function.
 * @returns The function getUSDWithoutCache is being returned.
 */
const getUSD = async (...args) => {
    const usd = await memoryCache.wrap("getUSD", function () {
        return getUSDWithoutCache(...args);
    });
    return usd;
};

module.exports = getUSD;
