import { render, screen } from '@testing-library/react';
import { RowDropdown } from '../index';

describe('RowDropdown Tests', () => {
  it('should render the RowDropdown  ', () => {
    const rowsPerPageMock = 1;
    const setRowsPerPageMock = jest.fn();
    render(
      <RowDropdown
        rowsPerPage={rowsPerPageMock}
        setRowsPerPage={setRowsPerPageMock}
      />
    );
    const rowDropdownLabel = screen.getByText(/rows per page/i);

    expect(rowDropdownLabel.outerHTML).toBe(
      '<label class="dropdown-label" for="">Rows Per Page</label>'
    );
  });
});
