import { render, screen } from '@testing-library/react';
import { Search } from '../index';

describe('Search Tests', () => {
  it('should render the search box ', () => {
    const setSearchQueryMock = jest.fn();
    const setPageMock = jest.fn();
    render(
      <Search setSearchQuery={setSearchQueryMock} setPage={setPageMock} />
    );
    const searchLabel = screen.getByText(/search/i);
    expect(searchLabel.outerHTML).toBe(
      '<label class="search-label" for="">Search </label>'
    );
  });
});
