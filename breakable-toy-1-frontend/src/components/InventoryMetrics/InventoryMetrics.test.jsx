import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import BasicTable from './InventoryMetrics';

global.fetch = jest.fn();

describe('BasicTable Component', () => {
  it('displays total data in the table after fetching products', async () => {
    const mockResponse = {
      Total: {
        totalStocks: 70,
        totalValue: 5000,
        average: 80,
      },
      Electronics: {
        totalStocks: 10,
        totalValue: 2500,
        average: 20,
      },
      Furniture: {
        totalStocks: 30,
        totalValue: 1500,
        average: 40,
      },
      Clothing: {
        totalStocks: 50,
        totalValue: 1000,
        average: 60,
      },
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponse),
      ok: true,
    });

    render(<BasicTable />);

    await waitFor(() => screen.getByText('Electronics'));

    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    expect(screen.getByText('Furniture')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();

    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

});
