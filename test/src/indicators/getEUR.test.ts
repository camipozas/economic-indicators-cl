import dayjs from 'dayjs';
import { getEUR } from '../../../src/indicators/getEUR';

describe('Indicators: getEUR', () => {
  const sevenDaysAgo = dayjs().subtract(7, 'day').format('YYYY/MM/[dias]/DD');

  test('[ERROR] Should return an error if the date is not valid', async () => {
    try {
      await getEUR('2021/01/01');
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toHaveProperty('message');
    }
  });

  test('[SUCCESS] Should return an object with the EUR indicator data', async () => {
    const data = await getEUR(sevenDaysAgo);
    expect(data).toHaveProperty('Fecha');
    expect(data).toHaveProperty('Valor');
  });
});
