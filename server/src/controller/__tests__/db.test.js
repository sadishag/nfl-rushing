import { getClient, getDataWithFilters } from '../db';
import { MongoClient } from 'mongodb';

console = { ...console, error: jest.fn() };

afterEach(() => {
  jest.restoreAllMocks();
});

describe('getClient Tests', () => {
  it('should return the client ', async () => {
    const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockReturnValueOnce(client);
    await getClient();

    expect(connectSpy).toBeCalledWith(
      'mongodb://root:example@localhost:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  });

  it('should return null when there is no client', async () => {
    const client = undefined;
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockReturnValueOnce(client);
    const result = await getClient();
    expect(result).toBe(null);
  });
});

describe('getDataWithFilters Tests', () => {
  it('should return an array of one object ', async () => {
    const collectionFuncs = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockReturnValueOnce([
        {
          Player: 'SomeName'
        }
      ])
    };
    const client = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnValueOnce(collectionFuncs),
      close: jest.fn()
    };
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockReturnValueOnce(client);
    const mockClient = await getClient();
    const result = await getDataWithFilters(mockClient, 'SomeName', {});

    expect(result.length).toBe(1);
  });

  it('should return an empty object and close the connection ', async () => {
    const collectionFuncs = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockImplementation(() => {
        throw new Error('Some Error');
      })
    };
    const client = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnValueOnce(collectionFuncs),
      close: jest.fn()
    };
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockReturnValueOnce(client);

    const mockClient = await getClient();
    const result = await getDataWithFilters(mockClient);

    expect(result.length).toBe(0);
    expect(client.close).toBeCalled();
  });
});
