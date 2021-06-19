import { generateCSV } from '../csvUtil';

describe('generateCSV Tests', () => {
  it('should return a csv string', () => {
    const jsonArray = [
      { test: 1, test2: 1 },
      { test: 2, test2: 1 },
      { test: 123, test1: 102 }
    ];

    const result = generateCSV(jsonArray);
    const expectedRes = 'test2,test,test1\r\n1,1,\r\n1,2,\r\n,123,102\r\n';

    expect(result).toBe(expectedRes);
  });

  it('should throw an error if there is an issue', () => {
    expect.assertions(1);
    try {
      const jsonArray = 'string';

      generateCSV(jsonArray);
    } catch (error) {
      expect(error.message).toBe('jsonArray.forEach is not a function');
    }
  });
});
