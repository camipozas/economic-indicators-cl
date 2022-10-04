const dayjs = require("dayjs");

const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");
const getUTM = require("./indicators/getUTM");
const getIPC = require("./indicators/getIPC");

/**
 * It fetches data from the Central Bank of Chile's API and returns it in a single object
 * @returns An object with the following structure:
 * {
 *     UF: {
 *         date: "2020-09-01",
 *         value: 0.0027
 *     },
 *     USD: {
 *         date: "2020-09-01",
 *         value: 0.0013
 *     },
 *     EUR: {
 *         date: "2020-09-01",
 */
const main = async () => {
    const sevenDaysAgo = dayjs().subtract(7, "day").format("YYYY/MM/[dias]/DD");
    const twoMonthAgo = dayjs().subtract(2, "month").format("YYYY/MM");
    const threeMonthAgo = dayjs().subtract(3, "month").format("YYYY/MM");

    const [ufData, usdData, eurData, utmData, ipcData] =
        await Promise.allSettled([
            getUF(sevenDaysAgo),
            getUSD(sevenDaysAgo),
            getEUR(sevenDaysAgo),
            getUTM(twoMonthAgo),
            getIPC(threeMonthAgo),
        ]);

    const mergedData = {};

    if (ufData.status === "fulfilled") {
        mergedData.UF = ufData.value;
    }

    if (usdData.status === "fulfilled") {
        mergedData.USD = usdData.value;
    }

    if (eurData.status === "fulfilled") {
        mergedData.EUR = eurData.value;
    }

    if (utmData.status === "fulfilled") {
        mergedData.UTM = utmData.value;
    }

    if (ipcData.status === "fulfilled") {
        mergedData.IPC = ipcData.value;
    }

    return mergedData;
};

module.exports = main;
