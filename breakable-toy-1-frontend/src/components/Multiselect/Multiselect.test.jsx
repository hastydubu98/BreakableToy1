import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MultipleSelectCheckmarks from './Multiselect';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(['Category 1', 'Category 2', 'Category 3']),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MultipleSelectCheckmarks Component', () => {
  it('renders correctly with no categories selected initially', () => {
    render(<MultipleSelectCheckmarks onCategoriesChange={jest.fn()} />);

    expect(screen.getByText('Category')).toBeInTheDocument();

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  it('displays categories after fetching data', async () => {
    render(<MultipleSelectCheckmarks onCategoriesChange={jest.fn()} />);

    const dropdown = screen.getByRole('combobox');
    fireEvent.mouseDown(dropdown)

    await waitFor(() => screen.getByText('Category 1'));

    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Category 3')).toBeInTheDocument();
  });



});
