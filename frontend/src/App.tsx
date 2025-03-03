import { Suspense } from 'react';
import DataTable from './components/DataTable';
import { Login } from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;