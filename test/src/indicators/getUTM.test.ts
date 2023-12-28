import dayjs from "dayjs";
import { getUTM } from "../../../src/indicators/getUTM";

describe("Indicators: getUTM", () => {
    const twoMonthAgo = dayjs().subtract(2, 'month').format('YYYY/MM');

    test("[ERROR] Should return an error if the date is not valid", async () => {
        try {
            await getUTM("2021/01/01");
            fail("Should have thrown an error");
        } catch (error) {
            expect(error).toHaveProperty("message");
        }
    });

    test("[SUCCESS] Should return an object with the EUR indicator data", async () => {
        const data = await getUTM(twoMonthAgo);
        expect(data).toHaveProperty("Fecha");
        expect(data).toHaveProperty("Valor");
    });
});