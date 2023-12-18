import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";

import { memoryCache } from "../cache";

dotenv.config();

type IPCData = {
	Fecha: Date;
	Valor: number;
};

type IPCApiResponse = {
	IPCs: IPCData[];
};

/**
 * It makes a request to the CMF API and returns the data.
 */
const getIPCWithoutCache = async (date: string): Promise<IPCData> => {
	const apikey = process.env.CMF_API_KEY;
	const response: AxiosResponse<IPCApiResponse> = await axios.get(
		`https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/posteriores/${date}?apikey=${apikey}&formato=json`
	);

	const latest = response.data.IPCs.reduce((prev, current) =>
		dayjs(current.Fecha).isAfter(dayjs(prev.Fecha)) ? current : prev
	);

	return {
		Fecha: latest.Fecha,
		Valor: latest.Valor,
	};
};

/**
 * It returns the result of the function `getIPCWithoutCache` but caches the result in memory for a
 * period of time.
 */
export const getIPC = async (
	...args: Parameters<typeof getIPCWithoutCache>
): Promise<IPCData> => {
	const ipc = await memoryCache.wrap("getIPC", function () {
		return getIPCWithoutCache(...args);
	});
	return ipc;
};
