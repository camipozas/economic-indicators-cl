import dayjs from 'dayjs';
import { getUF } from './indicators/getUF';
import { getUSD } from './indicators/getUSD';
import { getEUR } from './indicators/getEUR';
import { getUTM } from './indicators/getUTM';
import { getIPC } from './indicators/getIPC';

type IndicatorData = {
  Fecha: Date;
  Valor: number;
};

type CurrencyMap = {
  [key: string]: ((date: string) => Promise<IndicatorData>) | undefined;
};

type DateMap = {
  today: () => string;
  thisMonth: () => string;
  lastMonth: () => string;
};

type FetcherDateMap = {
  [key: string]: () => string;
};

const currencyMap: CurrencyMap = {
  uf: getUF,
  usd: getUSD,
  eur: getEUR,
  utm: getUTM,
  ipc: getIPC,
};

const dateMap: DateMap = {
  today: () => dayjs().format('YYYY/MM/DD'),
  thisMonth: () => dayjs().format('YYYY/MM'),
  lastMonth: () => dayjs().subtract(1, 'month').format('YYYY/MM'),
};

const fetcherDateMap: FetcherDateMap = {
  uf: dateMap.today,
  usd: dateMap.today,
  eur: dateMap.today,
  utm: dateMap.thisMonth,
  ipc: dateMap.lastMonth,
};

/**
 * Takes an array of currency names, fetches data for each currency using the
 * corresponding fetcher function, merges the data into a single object, and returns it.
 */
export const query = async (
  currencies: string[],
): Promise<Record<string, IndicatorData>> => {
  const currenciesFetchers = currencies
    .map(currency => currency.toLowerCase())
    .filter(currency => currencyMap[currency])
    .map(async currency => {
      const fetcher = currencyMap[currency]!;
      const date = fetcherDateMap[currency]();
      const upperCaseCurrency = currency.toUpperCase();
      return { [upperCaseCurrency]: await fetcher(date) };
    });

  const currenciesData = await Promise.all(currenciesFetchers);

  const mergedData: Record<string, IndicatorData> = {};

  for (const currencyData of currenciesData) {
    if (currencyData) {
      Object.assign(mergedData, currencyData);
    }
  }

  return mergedData;
};
