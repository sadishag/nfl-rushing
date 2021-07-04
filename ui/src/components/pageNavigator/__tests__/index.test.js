import { render, screen } from '@testing-library/react';
import { PageNavigator } from '../index';

describe('PageNavigator Tests', () => {
  it('should render the page navigator', async () => {
    const pageMock = 1;
    const setPageMock = jest.fn();
    const totalPagesMock = 2;

    const { container } = render(
      <PageNavigator
        page={pageMock}
        setPage={setPageMock}
        totalPages={totalPagesMock}
      />
    );

    expect(container.querySelector('span').innerHTML).toBe(
      '<a href="#"><i class="fas fa-caret-left"></i></a> 1 of 2 <a href="#"><i class="fas fa-caret-right"></i></a>'
    );
  });
});
