
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, MessageSquare, LogOut, LayoutDashboard, Wallet, ChevronDown, List, BarChart3 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  user?: any;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated = false, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">D</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">Dari</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/search?t=buy" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Acheter</Link>
              <Link to="/search?t=rent" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Louer</Link>
              <Link to="/search?p=commercial" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Bureaux</Link>
              <Link to="/search?p=land" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Terrains</Link>
              <Link to="/help" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Aide</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Se connecter</Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">S'inscrire</Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                   <Link to="/dashboard/messages" className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition relative">
                    <MessageSquare size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </Link>
                  <div className="h-8 w-px bg-slate-200 mx-2"></div>
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 p-1.5 pl-2 pr-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.charAt(0) || <User size={18} />}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-xs font-black leading-tight text-slate-900">{user?.name || 'Mon Compte'}</p>
                        <p className="text-[10px] text-blue-600 font-bold leading-tight">{user?.balance || 0} DA</p>
                      </div>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                        <div className="px-6 py-4 border-b border-slate-50 mb-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Session active</p>
                          <p className="font-black text-slate-900 truncate">{user?.name}</p>
                        </div>
                        <div className="px-2 space-y-1">
                          {[
                            { icon: <LayoutDashboard size={18} />, label: "Tableau de bord", path: "/dashboard" },
                            { icon: <List size={18} />, label: "Mes annonces", path: "/dashboard/ads" },
                            { icon: <BarChart3 size={18} />, label: "Analyses", path: "/dashboard/analytics" },
                            { icon: <Wallet size={18} />, label: "Mon solde", path: "/dashboard/balance" },
                            { icon: <User size={18} />, label: "Mon profil", path: "/dashboard/profile" },
                          ].map((item, i) => (
                            <Link key={i} to={item.path} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition">
                              <span className="text-slate-400">{item.icon}</span>
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-50 px-2">
                          <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition w-full text-left" onClick={handleLogoutClick}>
                            <LogOut size={18} />
                            <span>Se déconnecter</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">D</div>
                <span className="text-xl font-black text-white tracking-tighter">Dari</span>
              </div>
              <p className="text-sm leading-relaxed mb-8 opacity-60">Achetez, louez ou publiez vos appartements, maisons, commerces, bureaux et terrains partout en Algérie.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Dari</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/about" className="hover:text-blue-400 transition">À propos de Dari</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition">Offres & abonnements</Link></li>
                <li><Link to="/help" className="hover:text-blue-400 transition">Aide / FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Légal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/legal" className="hover:text-blue-400 transition">Mentions légales</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition">CGU</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition">Confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Contact</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                <li><Link to="/partners" className="hover:text-blue-400 transition">Partenariats</Link></li>
                <li><Link to="/recharge-points" className="hover:text-blue-400 transition">Devenir point de recharge</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-xs font-medium opacity-40 uppercase tracking-widest">Dari © {new Date().getFullYear()} – Plateforme immobilière en Algérie. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
