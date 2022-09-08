const axios = require("axios");
const getUF = require("./indicators/getUF");
const getUSD = require("./indicators/getUSD");
const getEUR = require("./indicators/getEUR");

const main = async () => {
    const ufData = await getUF();
    const usdData = await getUSD();
    const eurData = await getEUR();
    const mergedData = { ...ufData, ...usdData, ...eurData };
    console.log(mergedData);
};

main();
