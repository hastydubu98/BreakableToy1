import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import BasicButtons from './NewProduct';

const mockOnProductAdded = jest.fn();
const mockAddedSuccess = jest.fn();
const mockAddedError = jest.fn();
global.fetch = jest.fn();

describe('BasicButtons Component', () => {
  beforeEach(() => {
    global.fetch.mockClear();
    mockOnProductAdded.mockClear();
    mockAddedSuccess.mockClear();
    mockAddedError.mockClear();
  });

  it('calls addedSuccess and onProductAdded when form is submitted successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Product added successfully' })
    });

    render(<BasicButtons onProductAdded={mockOnProductAdded} addedSuccess={mockAddedSuccess} addedError={mockAddedError} />);

    fireEvent.click(screen.getByText(/New Product/i));

    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: '2025-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(mockAddedSuccess).toHaveBeenCalledWith(true);
      expect(mockOnProductAdded).toHaveBeenCalled();
    });
  });

  it('calls addedError when there is an error submitting the form', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Missing information'));

    render(<BasicButtons onProductAdded={mockOnProductAdded} addedSuccess={mockAddedSuccess} addedError={mockAddedError} />);

    fireEvent.click(screen.getByText(/New Product/i));

    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: '2025-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(mockAddedError).toHaveBeenCalledWith(true);
    });
  });

});
