
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, MessageSquare, LogOut, LayoutDashboard, Wallet, ChevronDown, List, BarChart3, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  user?: any;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated = false, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [location]);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇩🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">D</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">Dari</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to="/search?t=buy" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.buy')}</Link>
              <Link to="/search?t=rent" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.rent')}</Link>
              <Link to="/search?p=commercial" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.offices')}</Link>
              <Link to="/search?p=land" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.lands')}</Link>
              <Link to="/help" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.help')}</Link>
            </nav>

            <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Globe size={20} />
                  <span className="text-xs font-bold uppercase">{language}</span>
                </button>
                {isLangMenuOpen && (
                  <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 origin-top`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-start px-4 py-2 text-sm font-bold flex items-center space-x-3 rtl:space-x-reverse hover:bg-slate-50 transition ${language === lang.code ? 'text-blue-600' : 'text-slate-600'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.login')}</Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">{t('header.signup')}</Link>
                </>
              ) : (
                <div className="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
                   <Link to="/dashboard/messages" className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition relative">
                    <MessageSquare size={20} />
                    <span className="absolute top-2 end-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </Link>
                  <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2"></div>
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 md:space-x-3 p-1.5 ps-2 pe-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition group rtl:space-x-reverse"
                    >
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.charAt(0) || <User size={18} />}
                      </div>
                      <div className="hidden lg:block text-start">
                        <p className="text-xs font-black leading-tight text-slate-900">{user?.name || t('header.myAccount')}</p>
                        <p className="text-[10px] text-blue-600 font-bold leading-tight">{user?.balance || 0} {t('common.da')}</p>
                      </div>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isUserMenuOpen && (
                      <div className={`absolute ${language === 'ar' ? 'start-0' : 'end-0'} mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 overflow-hidden animate-in fade-in zoom-in-95 origin-top`}>
                        <div className="px-6 py-4 border-b border-slate-50 mb-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('header.myAccount')}</p>
                          <p className="font-black text-slate-900 truncate">{user?.name}</p>
                        </div>
                        <div className="px-2 space-y-1">
                          {[
                            { icon: <LayoutDashboard size={18} />, label: t('dashboard.menu.home'), path: "/dashboard" },
                            { icon: <List size={18} />, label: t('dashboard.menu.ads'), path: "/dashboard/ads" },
                            { icon: <BarChart3 size={18} />, label: t('dashboard.menu.stats'), path: "/dashboard/analytics" },
                            { icon: <Wallet size={18} />, label: t('dashboard.menu.wallet'), path: "/dashboard/balance" },
                            { icon: <User size={18} />, label: t('dashboard.menu.profile'), path: "/dashboard/profile" },
                          ].map((item, i) => (
                            <Link key={i} to={item.path} className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition">
                              <span className="text-slate-400">{item.icon}</span>
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-50 px-2">
                          <button className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition w-full text-start" onClick={handleLogoutClick}>
                            <LogOut size={18} />
                            <span>{t('header.logout')}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 text-start">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">D</div>
                <span className="text-xl font-black text-white tracking-tighter">Dari</span>
              </div>
              <p className="text-sm leading-relaxed mb-8 opacity-60">{t('footer.desc')}</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">{t('footer.usefulLinks')}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/about" className="hover:text-blue-400 transition">{t('footer.about')}</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition">{t('footer.pricing')}</Link></li>
                <li><Link to="/help" className="hover:text-blue-400 transition">{t('header.help')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">{t('footer.legal')}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/legal" className="hover:text-blue-400 transition">{t('footer.mentions')}</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition">{t('footer.cgu')}</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition">{t('footer.privacy')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/contact" className="hover:text-blue-400 transition">{t('footer.contact')}</Link></li>
                <li><Link to="/partners" className="hover:text-blue-400 transition">{t('footer.partners')}</Link></li>
                <li><Link to="/recharge-points" className="hover:text-blue-400 transition">{t('footer.recharge')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-xs font-medium opacity-40 uppercase tracking-widest">{t('footer.rights').replace('{year}', new Date().getFullYear().toString())}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
