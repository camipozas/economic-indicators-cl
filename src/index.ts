import dayjs from "dayjs";

import { getUF } from "./indicators/getUF";
import { getUSD } from "./indicators/getUSD";
import { getEUR } from "./indicators/getEUR";
import { getUTM } from "./indicators/getUTM";
import { getIPC } from "./indicators/getIPC";

type IndicatorData = {
	Fecha: Date;
	Valor: number;
};

type MergedData = Record<string, IndicatorData>;

/**
 * Fetches data from the Central Bank of Chile's API and returns it in a single object
 * @returns An object with the following structure:
 * {
 *     UF: {
 *         Fecha: "2020-09-01",
 *         Valor: 0.0027
 *     },
 *     USD: {
 *         Fecha: "2020-09-01",
 *         Valor: 0.0013
 *     },
 *     EUR: {
 *         Fecha: "2020-09-01",
 *         Valor: ...
 *     },
 *     UTM: {
 *         Fecha: ...
 *         Valor: ...
 *     },
 *     IPC: {
 *         Fecha: ...
 *         Valor: ...
 *     }
 * }
 */
export const main = async (): Promise<MergedData> => {
	const sevenDaysAgo = dayjs().subtract(7, "day").format("YYYY/MM/DD");
	const twoMonthAgo = dayjs().subtract(2, "month").format("YYYY/MM");
	const threeMonthAgo = dayjs().subtract(3, "month").format("YYYY/MM");

	const [ufData, usdData, eurData, utmData, ipcData] = await Promise.allSettled(
		[
			getUF(sevenDaysAgo),
			getUSD(sevenDaysAgo),
			getEUR(sevenDaysAgo),
			getUTM(twoMonthAgo),
			getIPC(threeMonthAgo),
		]
	);

	const mergedData: MergedData = {};

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
