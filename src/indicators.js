require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");
const memoryCache = require("./cache");

/* Getting the current date and formatting it to the format that the API requires. */
const today = dayjs().format("YYYY/MM/[dias]/DD");
const thisMonth = dayjs().format("YYYY/MM");

/**
 * It gets the UF value for today from the CMF API
 * @returns The data is being returned.
 */
const getUFWithoutCache = async () => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${today}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

/**
 * It returns the UF from the cache if it exists, otherwise it calls the getUFWithoutCache function and
 * returns the result.
 * @returns the UF value.
 */
const getUF = async () => {
    const uf = await memoryCache.wrap("getUF", function () {
        return getUFWithoutCache();
    });
    return uf;
};

/**
 * It makes a request to the CMF API, and returns the data
 * @returns The UTM value for the current month.
 */
const getUTMWithoutCache = async () => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/${thisMonth}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    return data;
};

/**
 * It returns the UTM from the cache if it exists, otherwise it gets the UTM from the database and
 * caches it.
 * @returns the UTM value.
 */
const getUTM = async () => {
    const uf = await memoryCache.wrap("getUTM", function () {
        return getUTMWithoutCache();
    });
    return uf;
};

/**
 * "We're going to get the UF and UTM data, and then merge them together."
 *
 * The first thing we do is call the getUF() function. This function returns a promise, so we use the
 * await keyword to wait for the promise to resolve. Once the promise resolves, we store the data in a
 * variable called ufData. Then repeat this step for the getUTM() function. Finally, we merge ufData
 * and utmData.
 */
const main = async () => {
    const ufData = await getUF();
    const utmData = await getUTM();
    const mergedData = { ...ufData, ...utmData };
    console.log(mergedData);
};

main();
