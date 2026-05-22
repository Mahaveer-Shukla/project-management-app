import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

const queryClient = new QueryClient();

function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

function PublicRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <AuthProvider>

        <div className="bg-[#0B1120] min-h-screen text-white overflow-x-hidden">

          <Router>

            <Routes>

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/project/:id"
                element={
                  <ProtectedRoute>
                    <ProjectDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Routes>

          </Router>

        </div>

      </AuthProvider>

    </QueryClientProvider>
  );
}

export default App;
