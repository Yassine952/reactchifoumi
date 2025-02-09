import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MatchesPage from './pages/MatchesPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
