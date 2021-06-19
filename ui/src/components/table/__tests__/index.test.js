import { render, screen } from '@testing-library/react';
import { Table } from '../index';

describe('Table tests', () => {
  it('should render the table with the right data', () => {
    const rushData = [
      {
        Player: 'somePlayer',
        Team: 'someTeam',
        Pos: 'somePos',
        Att: 1,
        Yds: 1,
        Avg: 1.2,
        TD: 1,
        Lng: 1,
        FUM: 1
      }
    ];
    rushData['Att/G'] = 1;
    rushData['Yds/G'] = 1;
    rushData['1st'] = 1;
    rushData['1st%'] = 1;
    rushData['20+'] = 1;
    rushData['40+'] = 1;
    const setSortOrder = jest.fn();
    const setSortBy = jest.fn();

    render(
      <Table
        rushData={rushData}
        sortOrder=""
        setSortOrder={setSortOrder}
        sortBy=""
        setSortBy={setSortBy}
      />
    );

    const playerNameHTML = screen.getByText(/someplayer/i);

    expect(playerNameHTML.outerHTML).toBe('<td>somePlayer</td>');
  });
});
