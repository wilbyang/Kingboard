import {describe, expect, it} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '../components/DataTable';


describe('DataTable', () => {
  it('renders loading state initially', () => {
    render(<DataTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data after loading', async () => {
    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_22222')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    render(<DataTable />);
    
    const searchInput = screen.getByPlaceholderText('Search by name...');
    await userEvent.type(searchInput, 'hardcoded');
    
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_22222')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_33333')).toBeInTheDocument();
    });
  });

  it('handles status filtering', async () => {
    render(<DataTable />);
    
    const statusSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(statusSelect, 'COMPLETED');
    
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
    });
  });

  it('formats dates correctly', async () => {
    render(<DataTable />);
    
    await waitFor(() => {
      expect(screen.getByText(/February 28th, 2025/)).toBeInTheDocument();
    });
  });
});
