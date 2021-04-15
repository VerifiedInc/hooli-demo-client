import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AltHeader from '../../../components/Header/AltHeader';

describe('AltHeader', () => {
  it('renders a header with a classname of alternate-header', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('HOME').closest('header')).toHaveClass('alternate-header');
  });

  it('renders three links', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('ABOUT GAVIN')).toBeInTheDocument();
    expect(screen.getByText('HOOLI-CON')).toBeInTheDocument();
  });

  it('renders a right side tab', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Making the world a better place.')).toBeInTheDocument();
  });
});
