import request from 'supertest';

let server;
process.env.PORT = 8000;

console = { ...console, error: jest.fn(), log: jest.fn() };

beforeAll(() => {
  server = require('../../../index');

  jest.mock('../../../controller/rushing', () => {
    return {
      getRushingData: jest.fn(
        (page, rowsPerPage, playerName, sortBy, sortOrder) => {
          if (playerName === 'goodPlayer' || playerName === '') {
            return { data: [{ Player: 'goodPlayer' }] };
          } else if (playerName === 'nullPlayer') {
            return null;
          } else {
            throw new Error('Error getting data');
          }
        }
      )
    };
  });
  jest.mock('../../../util/csvUtil', () => {
    return {
      generateCSV: jest.fn((rushdata) => {
        if (rushdata[0].Player === 'goodPlayer') {
          return 'GoodCSVResp';
        } else {
          throw new Error('Error with CSV');
        }
      })
    };
  });
});

describe('/api/v1/rush Tests', () => {
  it('should respond with 200', async () => {
    const result = await request(server).get('/api/v1/rush?search=goodPlayer');

    expect(result.status).toBe(200);
    expect(result.body).toEqual({ data: [{ Player: 'goodPlayer' }] });
  });

  it('should respond with 404', async () => {
    const result = await request(server).get('/api/v1/rush?search=nullPlayer');

    expect(result.status).toBe(404);
  });

  it('should respond with 500', async () => {
    const result = await request(server).get('/api/v1/rush?search=errorPlayer');

    expect(result.status).toBe(500);
  });
});

describe('/api/v1/rush/download-csv Tests', () => {
  it('should respond with 200', async () => {
    const result = await request(server).get('/api/v1/rush/download-csv');

    expect(result.status).toBe(200);
  });

  it('should respond with a 500', async () => {
    const rushing = require('../../../controller/rushing');
    const getRushingDataSpy = jest
      .spyOn(rushing, 'getRushingData')
      .mockImplementationOnce(() => {
        throw new Error('Rushing Error');
      });

    const result = await request(server).get('/api/v1/rush/download-csv');
    expect(result.status).toBe(500);
  });
});
