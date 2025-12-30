
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { ListingDetail } from './pages/ListingDetail';
import { Dashboard } from './pages/Dashboard';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { DashboardAds } from './pages/dashboard/DashboardAds';
import { DashboardBalance } from './pages/dashboard/DashboardBalance';
import { DashboardMessages } from './pages/dashboard/DashboardMessages';
import { DashboardProfile } from './pages/dashboard/DashboardProfile';
import { DashboardSubscription } from './pages/dashboard/DashboardSubscription';
import { DashboardAnalytics } from './pages/dashboard/DashboardAnalytics';
import { Pricing } from './pages/Pricing';
import { Help } from './pages/Help';
import { Contact } from './pages/Contact';
import { Legal, Terms, Privacy } from './pages/Legal';
import { About } from './pages/About';
import { Partners } from './pages/Partners';
import { AuthProvider, useAuth } from './context/AuthContext';

// Fix navigation scroll bug
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Chargement de Dari...</p>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AuthRoutes: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Layout isAuthenticated={isAuthenticated} user={user} onLogout={logout}>
      <ScrollToTop />
      <div className="animate-in fade-in duration-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<ListingDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/recharge-points" element={<Partners />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/ads" element={<ProtectedRoute><DashboardAds /></ProtectedRoute>} />
          <Route path="/dashboard/balance" element={<ProtectedRoute><DashboardBalance /></ProtectedRoute>} />
          <Route path="/dashboard/messages" element={<ProtectedRoute><DashboardMessages /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><DashboardProfile /></ProtectedRoute>} />
          <Route path="/dashboard/subscription" element={<ProtectedRoute><DashboardSubscription /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          
          <Route 
            path="/create-listing" 
            element={<ProtectedRoute><CreateListing /></ProtectedRoute>} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
