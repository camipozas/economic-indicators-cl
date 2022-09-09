const axios = require("axios");
const dayjs = require("dayjs");

const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");
const getUTM = require("./indicators/getUTM");
const getIPC = require("./indicators/getIPC");

const main = async () => {
    const today = dayjs().format("YYYY/MM/[dias]/DD");
    const thisMonth = dayjs().format("YYYY/MM");
    const lastMonth = dayjs().subtract(1, "month").format("YYYY/MM");

    const ufData = await getUF(today);
    const usdData = await getUSD(today);
    const eurData = await getEUR(today);
    const utmData = await getUTM(thisMonth);
    const ipcData = await getIPC(lastMonth);
    const mergedData = {
        ...ufData,
        ...usdData,
        ...eurData,
        ...utmData,
        ...ipcData,
    };
    console.log(mergedData);
};

main();
