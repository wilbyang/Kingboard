import React from 'react';
import { Task } from '../types';
import { formatDate } from '../utils';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface TableRowProps {
  item: Task;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle className="status-completed" size={16} />;
    case 'PENDING':
      return <Clock className="status-pending" size={16} />;
    case 'FAILED':
      return <XCircle className="status-failed" size={16} />;
    default:
      return null;
  }
};

const TableRow: React.FC<TableRowProps> = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{formatDate(item.createdOn)}</td>
      <td>
        <div className="status-icon">
          <StatusIcon status={item.status} />
          {item.status}
        </div>
      </td>
      <td>{item.description}</td>
      <td>{item.delta}</td>
    </tr>
  );
};

export default TableRow; 