import request from 'supertest';
import http from 'http';
import handler from '../../api/index';

type Currencies = Record<string, string>;

const currencies = {
    UF: "UF",
    USD: "USD",
    EUR: "EUR",
    UTM: "UTM",
    IPC: "IPC"
} as const satisfies Currencies;

type MergedData = {
    [key in keyof typeof currencies]: {
        Fecha: string,
        Valor: string
    }
}

const expectedResponse: MergedData = {
    "UF": { "Fecha": "2024-01-09", "Valor": "36.863,94" },
    "USD": { "Fecha": "2023-12-28", "Valor": "886,34" },
    "EUR": { "Fecha": "2023-12-28", "Valor": "984,6" },
    "UTM": { "Fecha": "2024-01-01", "Valor": "64.666" },
    "IPC": { "Fecha": "2023-11-01", "Valor": "0,7" }
}

describe('api: index', () => {
    let server: http.Server;

    jest.mock('../../src/indicators/getUF', () => ({
        getUF: jest.fn().mockResolvedValue(expectedResponse.UF),
    }));
    
    jest.mock('../../src/indicators/getUSD', () => ({
        getUSD: jest.fn().mockResolvedValue(expectedResponse.USD),
    }));
    
    jest.mock('../../src/indicators/getEUR', () => ({
        getEUR: jest.fn().mockResolvedValue(expectedResponse.EUR),
    }));
    
    jest.mock('../../src/indicators/getUTM', () => ({
        getUTM: jest.fn().mockResolvedValue(expectedResponse.UTM),
    }));
    
    jest.mock('../../src/indicators/getIPC', () => ({
        getIPC: jest.fn().mockResolvedValue(expectedResponse.IPC),
    }));

    beforeAll(() => {
        server = http.createServer((req, res) => {
            handler(req as any, res as any);
        });

        server.listen(0);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('[SUCCESS] should return all indicators', async () => {
        const response = await request(server)
          .get('/')
          .expect(200);
      
        expect(response.body).toEqual(expectedResponse);
    });
});
