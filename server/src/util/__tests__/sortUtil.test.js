import { sortHelper, isAscending } from '../sortUtil';

describe('sortHelper Tests', () => {
  it('should sort the array in ascending order by Lng', () => {
    let data = [
      { Lng: '1T', Yds: 10 },
      { Lng: '-1', Yds: 11 }
    ];
    sortHelper(data, 'Lng', 'ASC');

    const result = [
      { Lng: '-1', Yds: 11 },
      { Lng: '1T', Yds: 10 }
    ];
    expect(data).toEqual(result);
  });

  it('should sort the array in descending order by Lng', () => {
    let data = [
      { Lng: '1', Yds: 10 },
      { Lng: '-1', Yds: 11 },
      { Lng: '100', Yds: 1 }
    ];

    sortHelper(data, 'Lng', 'DESC');

    const result = [
      { Lng: '100', Yds: 1 },
      { Lng: '1', Yds: 10 },
      { Lng: '-1', Yds: 11 }
    ];
    expect(data).toEqual(result);
  });

  it('should not sort the array if a different parameter', () => {
    let data = [
      { Lng: '1', Yds: 10 },
      { Lng: '-1', Yds: 11 },
      { Lng: '100T', Yds: 1 }
    ];

    sortHelper(data, 'Yds', 'DESC');

    const result = [
      { Lng: '1', Yds: 10 },
      { Lng: '-1', Yds: 11 },
      { Lng: '100T', Yds: 1 }
    ];
    expect(data).toEqual(result);
  });
});
