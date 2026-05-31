import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Login } from './pages/Login/Login';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { Users } from './pages/Users/Users';
import { UserDetails } from './pages/UserDetails/UserDetails';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public login portal */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard routes nested inside persistent layout */}
          <Route 
            path="/dashboard/users" 
            element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            } 
          />

          <Route 
            path="/dashboard/users/:id" 
            element={
              <DashboardLayout>
                <UserDetails />
              </DashboardLayout>
            } 
          />

          {/* Redirect /dashboard to /dashboard/users */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/users" replace />} />
          
          {/* Redirect empty path to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
