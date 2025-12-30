
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
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
import { DashboardFavorites } from './pages/dashboard/DashboardFavorites';
import { DashboardAlerts } from './pages/dashboard/DashboardAlerts';
import { Pricing } from './pages/Pricing';
import { Help } from './pages/Help';
import { Contact } from './pages/Contact';
import { Legal, Terms, Privacy } from './pages/Legal';
import { About } from './pages/About';
import { Partners } from './pages/Partners';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Language } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Sync context language with URL segment
const LanguageSync = () => {
  const { lang } = useParams<{ lang: Language }>();
  const { setLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (lang && ['fr', 'ar', 'en'].includes(lang)) {
      if (lang !== language) setLanguage(lang);
    } else {
      // Redirect to default language if segment is invalid
      const defaultLang = localStorage.getItem('dari_lang') || 'fr';
      const cleanPath = location.pathname === '/' ? '' : location.pathname;
      navigate(`/${defaultLang}${cleanPath}`, { replace: true });
    }
  }, [lang, language, setLanguage, navigate, location.pathname]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  if (isLoading) return <div className="h-screen flex items-center justify-center">...</div>;
  if (!isAuthenticated) return <Navigate to={`/${language}/login`} />;
  return <>{children}</>;
};

const LanguageRoutes = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <Layout isAuthenticated={isAuthenticated} user={user} onLogout={logout}>
      <ScrollToTop />
      <LanguageSync />
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="property/:id" element={<ListingDetail />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="partners" element={<Partners />} />
        <Route path="legal" element={<Legal />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        
        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="dashboard/ads" element={<ProtectedRoute><DashboardAds /></ProtectedRoute>} />
        <Route path="dashboard/profile" element={<ProtectedRoute><DashboardProfile /></ProtectedRoute>} />
        <Route path="dashboard/balance" element={<ProtectedRoute><DashboardBalance /></ProtectedRoute>} />
        <Route path="dashboard/messages" element={<ProtectedRoute><DashboardMessages /></ProtectedRoute>} />
        <Route path="dashboard/subscription" element={<ProtectedRoute><DashboardSubscription /></ProtectedRoute>} />
        <Route path="dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
        <Route path="dashboard/favorites" element={<ProtectedRoute><DashboardFavorites /></ProtectedRoute>} />
        <Route path="dashboard/alerts" element={<ProtectedRoute><DashboardAlerts /></ProtectedRoute>} />
        <Route path="create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/:lang/*" element={<LanguageRoutes />} />
            <Route path="*" element={<Navigate to="/fr" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
