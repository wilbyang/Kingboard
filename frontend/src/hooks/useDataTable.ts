import { useState, useEffect } from 'react';
import { Task, PaginatedResponse } from '../types';
import { normalizeDate } from '../utils';
import { useAuth } from '../contexts/AuthContext';

interface UseDataTableProps {
  pageSize?: number;
}

export const useDataTable = ({ pageSize = 20 }: UseDataTableProps = {}) => {
  const { token } = useAuth();
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Task>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Reset to first page when search or status filter changes
    if (searchTerm || statusFilter) {
      setPage(1);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // Don't fetch if not authenticated
      
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: (page - 1).toString(),
          size: pageSize.toString(),
          search: searchTerm,
          status: statusFilter,
          sortField,
          sortDirection,
        });

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks?${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result: PaginatedResponse = await response.json();
        setData(result.content);
        setTotalItems(result.totalElements);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, searchTerm, statusFilter, sortField, sortDirection, token]);

  const handleSort = (field: keyof Task) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortData = (items: Task[]): Task[] => {
    return [...items].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdOn') {
        aValue = normalizeDate(aValue as string | number);
        bValue = normalizeDate(bValue as string | number);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return {
    data: sortData(data),
    loading,
    error,
    page,
    setPage,
    totalPages: Math.ceil(totalItems / pageSize),
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
  };
};
