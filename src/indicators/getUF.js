require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const memoryCache = require("../cache");

/**
 * It gets the latest UF value from the CMF API
 * @param date - The date you want to get the UF for.
 * @returns The latest UF value
 */
const getUFWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/posteriores/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    const [latest] = data.UFs.sort(
        (fecha) => -1 * dayjs().diff(dayjs(fecha["Fecha"]))
    );
    return latest;
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
