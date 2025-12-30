
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, BarChart3, Wallet, MessageSquare, CreditCard, User, LogOut, Heart, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path, active }) => (
  <Link 
    to={path}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-1 rtl:-translate-x-1' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400'} flex-shrink-0`}>{icon}</span>
    <span className="flex-grow text-start">{label}</span>
  </Link>
);

export const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate(`/${language}/`);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: t('dashboard.menu.home'), path: `/${language}/dashboard` },
    { icon: <List size={20} />, label: t('dashboard.menu.ads'), path: `/${language}/dashboard/ads` },
    { icon: <Heart size={20} />, label: t('dashboard.menu.favs'), path: `/${language}/dashboard/favorites` },
    { icon: <Bell size={20} />, label: t('dashboard.menu.alerts'), path: `/${language}/dashboard/alerts` },
    { icon: <BarChart3 size={20} />, label: t('dashboard.menu.stats'), path: `/${language}/dashboard/analytics` },
    { icon: <Wallet size={20} />, label: t('dashboard.menu.wallet'), path: `/${language}/dashboard/balance` },
    { icon: <MessageSquare size={20} />, label: t('dashboard.menu.chat'), path: `/${language}/dashboard/messages` },
    { icon: <CreditCard size={20} />, label: t('dashboard.menu.sub'), path: `/${language}/dashboard/subscription` },
    { icon: <User size={20} />, label: t('dashboard.menu.profile'), path: `/${language}/dashboard/profile` },
  ];

  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 sticky top-24">
        <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-slate-50">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-base font-black text-slate-900 truncate w-full px-2">{user.name}</h2>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1 bg-blue-50 px-3 py-1 rounded-full">
            {user.subscription === 'free' ? 'Gratuit' : user.subscription}
          </p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, i) => (
            <SidebarItem 
              key={i} 
              icon={item.icon} 
              label={item.label} 
              path={item.path} 
              active={location.pathname === item.path} 
            />
          ))}
          
          <div className="pt-6 mt-6 border-t border-slate-50">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full text-red-500 hover:bg-red-50 transition-all font-bold text-sm group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
              <span className="flex-grow text-start">{t('header.logout')}</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};
