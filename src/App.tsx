import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import SplashScreen from './components/SplashScreen';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import FirstAid from './components/FirstAid';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'splash' | 'auth' | 'dashboard' | 'chat' | 'firstaid'>('splash');
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentView('dashboard');
      } else {
        // Show splash for 3 seconds, then auth
        const timer = setTimeout(() => {
          setCurrentView('auth');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  const handleViewChange = (view: 'dashboard' | 'chat' | 'firstaid') => {
    setCurrentView(view);
  };

  if (loading) return <SplashScreen />;

  switch (currentView) {
    case 'splash':
      return <SplashScreen />;
    case 'auth':
      return <AuthPage />;
    case 'chat':
      return <ChatBot onBack={() => handleViewChange('dashboard')} />;
    case 'firstaid':
      return <FirstAid onBack={() => handleViewChange('dashboard')} />;
    case 'dashboard':
    default:
      return <Dashboard onNavigate={handleViewChange} />;
  }
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen transition-colors duration-300">
          <AppContent />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;