import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NetworkPage from './pages/NetworkPage';
import JobsPage from './pages/JobsPage';
import MessagingPage from './pages/MessagingPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { getCurrentUser } from './services/auth';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // For this demo, we'll auto-login as a default user if no user is found
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar currentUser={currentUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage currentUser={currentUser} />} />
            <Route path="/profile/:userId" element={<ProfilePage currentUser={currentUser} />} />
            <Route path="/mynetwork" element={<NetworkPage currentUser={currentUser} />} />
            <Route path="/jobs" element={<JobsPage currentUser={currentUser} />} />
            <Route path="/messaging" element={<MessagingPage currentUser={currentUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;