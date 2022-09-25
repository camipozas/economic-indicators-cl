require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const memoryCache = require("../cache");

/**
 * It makes a request to the CMF API and returns the data
 * @param date - The date you want to get the IPC for.
 * @returns The IPC value for the given date.
 */
const getIPCWithoutCache = async (date) => {
    const { data } = await axios.get(
        `https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/posteriores/${date}?apikey=${process.env.CMF_API_KEY}&formato=json`
    );
    const [latest] = data.IPCs.sort(
        (fecha) => -1 * dayjs().diff(dayjs(fecha["Fecha"]))
    );
    return latest;
};

/**
 * It returns the result of the function `getIPCWithoutCache` but caches the result in memory for a
 * period of time
 * @param args - The arguments to pass to the function.
 * @returns The function getIPCWithoutCache is being returned.
 */
const getIPC = async (...args) => {
    const ipc = await memoryCache.wrap("getIPC", function () {
        return getIPCWithoutCache(...args);
    });
    return ipc;
};

module.exports = getIPC;
