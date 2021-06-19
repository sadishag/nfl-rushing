let rushing;
console = { ...console, error: jest.fn }; // ingnore the console error prints, they make the test response ugly

beforeAll(() => {
  jest.mock('../../util/sortUtil', () => {
    return {
      sortHelper: jest.fn(),
      isAscending: jest.fn((order) => {
        if (order === 'ASC') {
          return true;
        }
        return false;
      })
    };
  });
  jest.mock('../db', () => {
    return {
      getClient: jest.fn(() => {
        return {};
      }),
      getDataWithFilters: jest.fn((dbClient, searchByName, sortQuery) => {
        if (searchByName === 'goodName') {
          return [{ Player: 'goodName', Lng: 1 }];
        }
        if (searchByName === 'nullObj') {
          return [];
        }
        if (searchByName === 'errorName') {
          throw new Error('Some error');
        }
      })
    };
  });

  rushing = require('../rushing');
});

describe('getRushingData Tests', () => {
  it('should return the right sorted data', async () => {
    const result = await rushing.getRushingData(
      1,
      10,
      'goodName',
      'Lng',
      'ASC'
    );

    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
    expect(result.data.length).toBe(1);
  });

  it('should return null if the page is invalid', async () => {
    const result = await rushing.getRushingData(
      2,
      10,
      'goodName',
      'Lng',
      'DESC'
    );

    expect(result).toBe(null);
  });

  it('should return an empty data object in the result if there is no data', async () => {
    const result = await rushing.getRushingData(
      undefined,
      undefined,
      'nullObj',
      'Yds',
      'ASC'
    );

    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
    expect(result.data.length).toBe(0);
  });

  it('should throw an error when there is an issue in the code', async () => {
    expect.assertions(1);
    try {
      const result = await rushing.getRushingData(
        1,
        10,
        'errorName',
        'Yds',
        'DESC'
      );
    } catch (error) {
      expect(error.message).toBe('Some error');
    }
  });
});
