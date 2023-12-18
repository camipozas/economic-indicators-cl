import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";

import { memoryCache } from "../cache";

dotenv.config();

type UTMData = {
	Fecha: Date;
	Valor: number;
};

type UTMApiResponse = {
	UTMs: UTMData[];
};

/**
 * It gets the latest UTM value from the Chilean Central Bank's API.
 */
const getUTMWithoutCache = async (date: string): Promise<UTMData> => {
	const apikey = process.env.CMF_API_KEY;
	const response: AxiosResponse<UTMApiResponse> = await axios.get(
		`https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/posteriores/${date}?apikey=${apikey}&formato=json`
	);

	const latest = response.data.UTMs.reduce((prev, current) =>
		dayjs(current.Fecha).isAfter(dayjs(prev.Fecha)) ? current : prev
	);

	return {
		Fecha: latest.Fecha,
		Valor: latest.Valor,
	};
};

/**
 * It returns the UTM parameters from the URL.
 */
export const getUTM = async (
	...args: Parameters<typeof getUTMWithoutCache>
): Promise<UTMData> => {
	const utm = await memoryCache.wrap("getUTM", function () {
		return getUTMWithoutCache(...args);
	});
	return utm;
};
