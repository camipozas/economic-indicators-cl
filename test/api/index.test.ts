import request from 'supertest';
import http from 'http';
import handler from '../../api/index';

const currencies = {
    UF: "UF",
    USD: "USD",
    EUR: "EUR",
    UTM: "UTM",
    IPC: "IPC"
}

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

const mockGetUF = jest.fn().mockResolvedValue(expectedResponse.UF);
const mockGetUSD = jest.fn().mockResolvedValue(expectedResponse.USD);
const mockGetEUR = jest.fn().mockResolvedValue(expectedResponse.EUR);
const mockGetUTM = jest.fn().mockResolvedValue(expectedResponse.UTM);
const mockGetIPC = jest.fn().mockResolvedValue(expectedResponse.IPC);

jest.mock('../../src/indicators/getUF', () => {
    return {
        getUF: mockGetUF,
    };
});

jest.mock('../../src/indicators/getUSD', () => {
    return {
        getUSD: mockGetUSD,
    };
});

jest.mock('../../src/indicators/getEUR', () => {
    return {
        getEUR: mockGetEUR,
    };
});

jest.mock('../../src/indicators/getUTM', () => {
    return {
        getUTM: mockGetUTM,
    };
});

jest.mock('../../src/indicators/getIPC', () => {
    return {
        getIPC: mockGetIPC,
    };
});

describe('api: index', () => {
    let server: http.Server;

    beforeAll(() => {
        // Creamos un servidor HTTP que escuche en un puerto libre
        server = http.createServer((req, res) => {
            handler(req as any, res as any);
        });

        server.listen(0); // 0 significa que se asignará un puerto libre automáticamente
    });

    afterAll((done) => {
        // Cerramos el servidor después de todas las pruebas
        server.close(done);
    });

    // Probamos el endpoint usando supertest en el servidor que creamos
    test('[SUCCESS] should return all indicators', async () => {
        const response = await request(server)
          .get('/')
          .expect(200);
      
        expect(response.body).toEqual(expectedResponse);
    });
});
