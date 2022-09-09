const axios = require("axios");
const dayjs = require("dayjs");

const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");
const getUTM = require("./indicators/getUTM");
const getIPC = require("./indicators/getIPC");

/**
 * It fetches data from the Central Bank of Chile's API, merges it into a single object, and returns it
 */
const main = async () => {
    const today = dayjs().format("YYYY/MM/[dias]/DD");
    const thisMonth = dayjs().format("YYYY/MM");
    const lastMonth = dayjs().subtract(1, "month").format("YYYY/MM");

    const [ufData, usdData, eurData, utmData, ipcData] = await Promise.all([
        getUF(today),
        getUSD(today),
        getEUR(today),
        getUTM(thisMonth),
        getIPC(lastMonth),
    ]);

    const mergedData = {
        ...ufData,
        ...usdData,
        ...eurData,
        ...utmData,
        ...ipcData,
    };
};

module.exports = main;
