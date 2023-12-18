import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";

import { memoryCache } from "../cache";

dotenv.config();

type EuroData = {
	Fecha: Date;
	Valor: number;
};

type EuroApiResponse = {
	Euros: EuroData[];
};

/**
 * It gets the latest EUR exchange rate from the Chilean Central Bank API.
 */
const getEURWithoutCache = async (date: string): Promise<EuroData> => {
	const apikey = process.env.CMF_API_KEY;
	const response: AxiosResponse<EuroApiResponse> = await axios.get(
		`https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/posteriores/${date}?apikey=${apikey}&formato=json`
	);

	const latest = response.data.Euros.reduce((prev, current) =>
		dayjs(current.Fecha).isAfter(dayjs(prev.Fecha)) ? current : prev
	);

	return {
		Fecha: latest.Fecha,
		Valor: latest.Valor,
	};
};

/**
 * It returns the value of the euro.
 */
export const getEUR = async (
	...args: Parameters<typeof getEURWithoutCache>
): Promise<EuroData> => {
	const euro = await memoryCache.wrap("getEUR", function () {
		return getEURWithoutCache(...args);
	});
	return euro;
};
