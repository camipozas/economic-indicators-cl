const dayjs = require("dayjs");

/* Getting the current date and formatting it to the format that the API requires. */
const today = dayjs().format("YYYY/MM/[dias]/DD");
const thisMonth = dayjs().format("YYYY/MM");

module.exports = today;
