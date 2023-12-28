import dayjs from "dayjs";
import { getIPC } from "../../../src/indicators/getIPC";

describe("Indicators: getIPC", () => {
    const threeMonthAgo = dayjs().subtract(3, 'month').format('YYYY/MM');

    test("[ERROR] Should return an error if the date is not valid", async () => {
        try {
            await getIPC("2021/01/01");
            fail("Should have thrown an error");
        } catch (error) {
            expect(error).toHaveProperty("message");
        }
    });

    test("[SUCCESS] Should return an object with the EUR indicator data", async () => {
        const data = await getIPC(threeMonthAgo);
        expect(data).toHaveProperty("Fecha");
        expect(data).toHaveProperty("Valor");
    });
});