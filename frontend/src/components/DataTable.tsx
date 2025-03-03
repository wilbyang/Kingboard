import React from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { Task } from '../types';
import { useDataTable } from '../hooks/useDataTable';
import { formatDate } from '../utils';

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{formatDate(item.createdOn)}</td>
                <td>{item.status}</td>
                <td>{item.description}</td>
                <td>{item.delta}</td>
              </tr>
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

      <style>{`
        .container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .controls {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .search-box {
          position: relative;
          flex: 1;
        }

        .search-box input {
          width: 100%;
          padding: 8px 32px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #666;
        }

        select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 150px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }

        tr:hover {
          background-color: #f9f9f9;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 20px;
          align-items: center;
        }

        button {
          padding: 8px 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          background-color: #f5f5f5;
        }

        .error {
          color: red;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default DataTable;
