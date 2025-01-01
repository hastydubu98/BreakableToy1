import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SelectLabels from './Availability';

describe('Availability Component', () => {

    it('renders correctly with all options', () => {

        const mockOnAvailabilityChange = jest.fn();

        render(<SelectLabels onAvailabilityChange={mockOnAvailabilityChange} />);

       expect(screen.getByRole(
           "paragraph"
           )
       ).toBeInTheDocument();

        const dropdown = screen.getByRole("combobox");
        expect(dropdown).toBeInTheDocument();

        fireEvent.mouseDown(dropdown);
        expect(screen.getByText('In stock')).toBeInTheDocument();
        expect(screen.getByText('Out of stock')).toBeInTheDocument();
      });

    it('calls onAvailabilityChange when a selection is made', async () => {
    const mockOnAvailabilityChange = jest.fn();

    render(<SelectLabels onAvailabilityChange={mockOnAvailabilityChange} />);

    const dropdown = screen.getByRole("combobox", { name: "All" });

    fireEvent.keyDown(dropdown, { key: 'ArrowDown' });

    await waitFor(() => screen.getByText('In stock'));

    const option = screen.getByText('In stock');
    fireEvent.click(option);

    expect(mockOnAvailabilityChange).toHaveBeenCalledWith('In stock');
    });
});

