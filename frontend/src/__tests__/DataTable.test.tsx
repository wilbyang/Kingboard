import {describe, expect, it} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '../components/DataTable';
import { AuthProvider } from '../contexts/AuthContext';
import { vi } from 'vitest';

// Mock the auth context
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    token: 'fake-jwt-token',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Wrap component with necessary providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('DataTable', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<DataTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data after loading', async () => {
    renderWithProviders(<DataTable />);
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_22222')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    renderWithProviders(<DataTable />);
    
    const searchInput = screen.getByPlaceholderText('Search by name...');
    await userEvent.type(searchInput, 'hardcoded');
    
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_22222')).toBeInTheDocument();
      expect(screen.getByText('hardcoded_33333')).toBeInTheDocument();
    });
  });

  it('handles status filtering', async () => {
    renderWithProviders(<DataTable />);
    
    const statusSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(statusSelect, 'COMPLETED');
    
    await waitFor(() => {
      expect(screen.getByText('hardcoded_11111')).toBeInTheDocument();
    });
  });

  it('formats dates correctly', async () => {
    renderWithProviders(<DataTable />);
    
    await waitFor(() => {
      expect(screen.getByText(/February 28th, 2025/)).toBeInTheDocument();
    });
  });
});

describe('DataTable Authentication', () => {
  it('includes auth token in API requests', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderWithProviders(<DataTable />);
    
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer fake-jwt-token'
          })
        })
      );
    });
  });

  it('handles unauthorized errors', async () => {
    // Mock fetch to return 401
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(new Response(null, { status: 401 }))
    );

    renderWithProviders(<DataTable />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });
});
