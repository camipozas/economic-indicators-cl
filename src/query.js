const dayjs = require("dayjs");

const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");
const getUTM = require("./indicators/getUTM");
const getIPC = require("./indicators/getIPC");

/* A map of the currency to the function that fetches the data. */
const currencyMap = {
    uf: getUF,
    usd: getUSD,
    eur: getEUR,
    utm: getUTM,
    ipc: getIPC,
};

/* A map of the date to the function that fetches the data. */
const dateMap = {
    today: () => dayjs().format("YYYY/MM/[dias]/DD"),
    thisMonth: () => dayjs().format("YYYY/MM"),
    lastMonth: () => dayjs().subtract(1, "month").format("YYYY/MM"),
};

/* A map of the currency to the function that fetches the data. */
const fetcherDateMap = {
    uf: dateMap.today,
    usd: dateMap.today,
    eur: dateMap.today,
    utm: dateMap.thisMonth,
    ipc: dateMap.lastMonth,
};

/**
 * It takes an array of currencies, fetches the data for each currency, and merges the data into a
 * single object
 * @param currencies - An array of currencies to fetch.
 * @returns An object with the currency data.
 */
const query = async (currencies) => {
    const currenciesFetchers = currencies
        .map((currency) => currency.toLowerCase())
        .filter((currency) => currencyMap[currency])
        .map(async (currency) => {
            const fetcher = currencyMap[currency];
            const date = fetcherDateMap[currency]();
            return fetcher(date);
        });

    const currenciesData = await Promise.all(currenciesFetchers);

    const mergedData = {};

    for (const currencyData of currenciesData) {
        Object.assign(mergedData, currencyData);
    }
    return mergedData;
};

module.exports = query;
