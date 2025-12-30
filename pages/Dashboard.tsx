
import React from 'react';
import { Wallet, List, PlusCircle, ChevronRight, BadgeCheck, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { DashboardSidebar } from '../components/DashboardSidebar';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const stats = {
    activeAds: 2,
    messages: 3,
    subscription: user.subscription === 'free' ? t('pricing.freeTitle') : user.subscription
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('dashboard.hello')} {user.name.split(' ')[0]} 👋</h1>
              <p className="text-slate-500 font-medium mt-1">{t('dashboard.manageAdsDesc')}</p>
            </div>
            <Link to="/create-listing" className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-[1.25rem] font-black text-sm hover:bg-blue-700 transition shadow-2xl shadow-blue-100 group">
              <PlusCircle size={20} className="me-3 group-hover:scale-110 transition" /> {t('dashboard.postAd')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl text-blue-600 flex items-center justify-center shadow-inner">
                  <Wallet size={28} />
                </div>
                <Link to="/dashboard/balance" className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {t('dashboard.wallet.rechargeTitle')} <ChevronRight size={14} className="ms-1 rtl:rotate-180" />
                </Link>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t('dashboard.wallet.available')}</p>
              <p className="text-4xl font-black text-slate-900">{user.balance.toLocaleString()} <span className="text-lg font-bold text-slate-300">{t('common.da')}</span></p>
              <div className="mt-6 inline-flex items-center text-[10px] text-green-600 font-black uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-lg w-fit">
                <BadgeCheck size={14} className="me-1.5" /> {t('dashboard.bonusActive')}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl text-purple-600 flex items-center justify-center shadow-inner">
                  <List size={28} />
                </div>
                <Link to="/dashboard/ads" className="flex items-center text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {t('common.edit')} <ChevronRight size={14} className="ms-1 rtl:rotate-180" />
                </Link>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t('dashboard.activeAds')}</p>
              <p className="text-4xl font-black text-slate-900">{stats.activeAds}</p>
              <div className="mt-6 text-[10px] text-slate-400 font-bold flex items-center">
                 <AlertCircle size={14} className="me-1.5 text-orange-400" /> {t('dashboard.ads.expiringSoon')}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl text-orange-600 flex items-center justify-center shadow-inner">
                  <MessageSquare size={28} />
                </div>
                <Link to="/dashboard/messages" className="flex items-center text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {t('dashboard.chat.reply')} <ChevronRight size={14} className="ms-1 rtl:rotate-180" />
                </Link>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t('dashboard.messages')}</p>
              <p className="text-4xl font-black text-slate-900">{stats.messages}</p>
              <div className="mt-6 text-[10px] text-orange-600 font-black uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-lg w-fit">
                {t('dashboard.actionRequired')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/30 overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">{t('dashboard.statsTitle')}</h2>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{t('dashboard.statsSubtitle')}</p>
              </div>
            </div>
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                <TrendingUp size={32} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{t('dashboard.noData')}</h3>
              <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">{t('dashboard.noDataDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
