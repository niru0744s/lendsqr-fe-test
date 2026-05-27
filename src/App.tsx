import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route points to Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
