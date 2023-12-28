import dayjs from "dayjs";
import { getUSD } from "../../../src/indicators/getUSD";

describe("Indicators: getUSD", () => {
    const sevenDaysAgo = dayjs().subtract(7, 'day').format('YYYY/MM/[dias]/DD');

    test("[ERROR] Should return an error if the date is not valid", async () => {
        try {
            await getUSD("2021/01/01");
            fail("Should have thrown an error");
        } catch (error) {
            expect(error).toHaveProperty("message");
        }
    });

    test("[SUCCESS] Should return an object with the EUR indicator data", async () => {
        const data = await getUSD(sevenDaysAgo);
        expect(data).toHaveProperty("Fecha");
        expect(data).toHaveProperty("Valor");
    });
});