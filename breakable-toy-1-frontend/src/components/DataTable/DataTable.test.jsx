import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import DataTable from './DataTable';

describe('DataTable Component', () => {
  it('renders the DataGrid component', () => {
    render(<DataTable refreshSignal={false} deleteSuccess={() => {}} newFilter={[]} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});