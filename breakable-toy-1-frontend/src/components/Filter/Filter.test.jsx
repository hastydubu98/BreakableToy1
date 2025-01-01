import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import RowAndColumnSpacing from './Filter';

describe('RowAndColumnSpacing Component', () => {
  const mockOnFilterComplete = jest.fn();

  it('renders all child components', () => {
    render(<RowAndColumnSpacing onFilterComplete={mockOnFilterComplete} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    const availabilityElements = screen.getAllByText(/Availability/i);

    expect(availabilityElements.length).toBeGreaterThan(0);
  });

});
