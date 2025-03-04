import { http, HttpResponse } from 'msw';
import { Task } from '../types';








export const handlersGen = (mockDatabase: Task[]) => {
  return [
    http.get('/api/tasks', ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '0');
      const pageSize = parseInt(url.searchParams.get('size') || '10');
      const search = url.searchParams.get('search') || '';
      const status = url.searchParams.get('status') || '';
      const sortField = url.searchParams.get('sortField') as keyof Task || 'id';
      const sortDirection = url.searchParams.get('sortDirection') || 'asc';

      let filteredData = [...mockDatabase];

      // Apply search filter
      if (search) {
        filteredData = filteredData.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply status filter
      if (status) {
        filteredData = filteredData.filter(item => item.status === status);
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      // Apply pagination
      const start = page * pageSize;
      const paginatedData = filteredData.slice(start, start + pageSize);

      return HttpResponse.json({
        content: paginatedData,
        total: filteredData.length,
        page,
        pageSize
      });
    }),
    http.post('/api/auth/login', async ({ request }) =>  {
      const { username, password } = await request.json();
      if (username === 'user' && password === 'password') {
        return HttpResponse.json({ token: 'mocked-token' });
      }
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }),
  ];
}
