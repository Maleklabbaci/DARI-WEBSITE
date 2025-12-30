
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
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Change la langue en mettant à jour le segment d'URL
   * Exemple: /fr/dashboard -> /ar/dashboard
   */
  const changeLanguage = (newLang: Language) => {
    if (newLang === language) {
      setIsLangMenuOpen(false);
      return;
    }

    const pathSegments = location.pathname.split('/');
    // Le segment 1 est toujours le code langue (ex: ['', 'fr', 'search'])
    pathSegments[1] = newLang; 
    
    setLanguage(newLang);
    setIsLangMenuOpen(false);
    
    // Navigation vers le nouveau segment d'URL
    const newPath = pathSegments.join('/') || `/${newLang}`;
    navigate(newPath, { replace: true });
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'ar', label: 'Arabe', native: 'العربية' },
    { code: 'en', label: 'English', native: 'English' }
  ];

  const currentYear = new Date().getFullYear().toString();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to={`/${language}`} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">D</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">Dari</span>
            </Link>

            {/* Nav Links Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to={`/${language}/search?t=buy`} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.buy')}</Link>
              <Link to={`/${language}/search?t=rent`} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.rent')}</Link>
              <Link to={`/${language}/search?p=commercial`} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.offices')}</Link>
              <Link to={`/${language}/help`} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.help')}</Link>
            </nav>

            {/* Actions & Language Switcher */}
            <div className="flex items-center gap-4">
              {/* Language Switcher Dropdown */}
              <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-50 text-slate-700 rounded-2xl hover:bg-slate-100 transition border border-slate-100 group shadow-sm"
                >
                  <Globe size={18} className="text-blue-600 group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{language}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangMenuOpen && (
                  <div className="absolute end-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right rtl:origin-top-left ring-1 ring-black/5">
                    <div className="px-5 py-2 mb-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('header.language') || 'Langue'}</p>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 transition ${language === lang.code ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-black">{lang.native}</span>
                          <span className="text-[10px] font-bold text-slate-400">{lang.label}</span>
                        </div>
                        {language === lang.code && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 shadow-lg shadow-blue-200"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Area */}
              <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

              {!isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to={`/${language}/login`} className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t('header.login')}</Link>
                  <Link to={`/${language}/signup`} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95">
                    {t('header.signup')}
                  </Link>
                </div>
              ) : (
                <Link to={`/${language}/dashboard`} className="flex items-center gap-3 p-1.5 ps-2 pe-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition shadow-sm group">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md group-hover:scale-105 transition-transform">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-start leading-tight">
                    <p className="text-xs font-black text-slate-900 truncate max-w-[100px]">{user?.name}</p>
                    <p className="text-[10px] text-blue-600 font-bold">{user?.balance?.toLocaleString()} DA</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-8">
              <Link to={`/${language}`} className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-base shadow-lg">D</div>
                <span className="text-xl font-black text-white tracking-tighter">Dari</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs text-start">
                {t('footer.desc')}
              </p>
            </div>

            <div className="text-start">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">{t('footer.dari.title')}</h4>
              <ul className="space-y-4">
                <li><Link to={`/${language}/about`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.dari.about')}</Link></li>
                <li><Link to={`/${language}/pricing`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.dari.pricing')}</Link></li>
                <li><Link to={`/${language}/help`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.dari.help')}</Link></li>
              </ul>
            </div>

            <div className="text-start">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">{t('footer.legal.title')}</h4>
              <ul className="space-y-4">
                <li><Link to={`/${language}/legal`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.legal.mentions')}</Link></li>
                <li><Link to={`/${language}/terms`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.legal.terms')}</Link></li>
                <li><Link to={`/${language}/privacy`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.legal.privacy')}</Link></li>
              </ul>
            </div>

            <div className="text-start">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">{t('footer.contact.title')}</h4>
              <ul className="space-y-4">
                <li><Link to={`/${language}/contact`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.contact.contact')}</Link></li>
                <li><Link to={`/${language}/partners`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.contact.partners')}</Link></li>
                <li><Link to={`/${language}/partners`} className="text-slate-400 hover:text-white transition text-sm font-bold">{t('footer.contact.becomePartner')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-800 text-center">
            <p className={`text-[10px] font-black opacity-30 leading-relaxed ${language === 'ar' ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
              {t('footer.rights').replace('{year}', currentYear)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
