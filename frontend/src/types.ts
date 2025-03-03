export interface Task {
  id: number;
  status: string;
  createdOn: number | string;
  name: string;
  description: string;
  delta: number;
}

export interface PaginatedResponse {
  content: Task[];
  totalElements: number;
  page: number;
  pageSize: number;
}
