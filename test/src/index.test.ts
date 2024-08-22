import { main } from '../../src/index';

describe('src: index', () => {

    test('[ERROR] should return an error if any of the promises fails', async () => {
        jest.mock('../../src/indicators/getUF', () => {
            return {
                getUF: jest.fn().mockRejectedValue(new Error('Error')),
            };
        });
        try {
            await main();
        } catch (error) {
            expect(error).toEqual(new Error('Error'));
        }
    });

    test('[SUCCESS] should return merged data', async () => {
        const mergedData = await main();
        expect(mergedData).toHaveProperty('UF');
        expect(mergedData).toHaveProperty('USD');
        expect(mergedData).toHaveProperty('EUR');
        expect(mergedData).toHaveProperty('UTM');
        expect(mergedData).toHaveProperty('IPC');
    });
});