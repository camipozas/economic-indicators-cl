import { memoryCache } from '../../src/cache';

describe('Utils: cache', () => {
    test('[SUCCESS] should save and get data from cache', async () => {
        const key = 'test';
        const value = 'test';
        await memoryCache.set(key, value);
        const cachedValue = await memoryCache.get(key);
        expect(cachedValue).toEqual(value);
    });
});