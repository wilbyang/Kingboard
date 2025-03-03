import { Suspense } from 'react';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable />
      </Suspense>
    </div>
  );
}

export default App;