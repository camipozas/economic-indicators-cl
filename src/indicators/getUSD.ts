import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { memoryCache } from '../cache';

dotenv.config();

type USDData = {
  Fecha: Date;
  Valor: number;
};

type USDApiResponse = {
  Dolares: USDData[];
};

/**
 * It makes a request to the CMF API and returns the data.
 */
const getUSDWithoutCache = async (date: string): Promise<USDData> => {
  const apikey = process.env.CMF_API_KEY;
  const response: AxiosResponse<USDApiResponse> = await axios.get(
    `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/posteriores/${date}?apikey=${apikey}&formato=json`,
  );

  const latest = response.data.Dolares.reduce((prev, current) =>
    dayjs(current.Fecha).isAfter(dayjs(prev.Fecha)) ? current : prev,
  );

  return {
    Fecha: latest.Fecha,
    Valor: latest.Valor,
  };
};

/**
 * It returns the value of the USD.
 */
export const getUSD = async (
  ...args: Parameters<typeof getUSDWithoutCache>
): Promise<USDData> => {
  const usd = await memoryCache.wrap('getUSD', function () {
    return getUSDWithoutCache(...args);
  });
  return usd;
};
