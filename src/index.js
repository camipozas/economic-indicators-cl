const axios = require("axios");
const dayjs = require("dayjs");

const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");
const getUTM = require("./indicators/getUTM");
const getIPC = require("./indicators/getIPC");

/**
 * It fetches data from the Central Bank of Chile's API, and returns a single object with all the data
 * @returns An object with the following structure:
 * {
 *     UF: {
 *         date: "2020-04-01",
 *         value: 28.8
 *     },
 *     USD: {
 *         date: "2020-04-01",
 *         value: 755.5
 *     },
 *     EUR: {
 *         date: "2020-04-01",
 */
const main = async () => {
    const sevenDaysAgo = dayjs().subtract(7, "day").format("YYYY/MM/[dias]/DD");
    const lastMonth = dayjs().subtract(1, "month").format("YYYY/MM");
    const twoMonthBefore = dayjs().subtract(2, "month").format("YYYY/MM");

    const [ufData, usdData, eurData, utmData, ipcData] = await Promise.all([
        getUF(sevenDaysAgo),
        getUSD(sevenDaysAgo),
        getEUR(sevenDaysAgo),
        getUTM(lastMonth),
        getIPC(twoMonthBefore),
    ]);

    const mergedData = {
        UF: ufData,
        USD: usdData,
        EUR: eurData,
        UTM: utmData,
        IPC: ipcData,
    };

    return mergedData;
};

module.exports = main;
