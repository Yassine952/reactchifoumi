import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MatchesPage from './pages/MatchesPage';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import MatchDetail from "./pages/MatchDetail";

function App() {
  return (
    <AuthProvider>
      <div className='bg-gray-100 min-h-screen'>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/matches/:matchId" element={<MatchDetail />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
