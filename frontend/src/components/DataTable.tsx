import React, { useCallback } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { Task } from '../types';
import { useDataTable } from '../hooks/useDataTable';
import TableRow from './TableRow';
import './DataTable.css';
import debounce from 'lodash/debounce';

const DataTable: React.FC = () => {
  const {
    data,
    loading,
    error,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
  } = useDataTable();

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const renderSortIcon = (field: keyof Task) => (
    <ArrowUpDown
      className={`inline-block ml-1 h-4 w-4 cursor-pointer ${
        sortField === field ? 'text-blue-600' : 'text-gray-400'
      }`}
      onClick={() => handleSort(field)}
    />
  );

  return (
    <div className="container">
      <div className="controls">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            defaultValue={searchTerm}
            onChange={(e) => debouncedSetSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID {renderSortIcon('id')}</th>
            <th>Name {renderSortIcon('name')}</th>
            <th>Created On {renderSortIcon('createdOn')}</th>
            <th>Status</th>
            <th>Description</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} item={item} />
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
