import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { memoryCache } from '../cache';

dotenv.config();

type UFData = {
  Fecha: Date;
  Valor: number;
};

type UFApiResponse = {
  UFs: UFData[];
};

/**
 * It gets the latest UF value from the CMF API.
 */
const getUFWithoutCache = async (date: string): Promise<UFData> => {
  const apikey = process.env.CMF_API_KEY;
  const response: AxiosResponse<UFApiResponse> = await axios.get(
    `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/posteriores/${date}?apikey=${apikey}&formato=json`,
  );

  const latest = response.data.UFs.reduce((prev, current) =>
    dayjs(current.Fecha).isAfter(dayjs(prev.Fecha)) ? current : prev,
  );

  return {
    Fecha: latest.Fecha,
    Valor: latest.Valor,
  };
};

/**
 * It returns the UF from the cache if it exists, otherwise it calls the getUFWithoutCache function and
 * returns the result.
 */
export const getUF = async (
  ...args: Parameters<typeof getUFWithoutCache>
): Promise<UFData> => {
  const uf = await memoryCache.wrap('getUF', function () {
    return getUFWithoutCache(...args);
  });
  return uf;
};
