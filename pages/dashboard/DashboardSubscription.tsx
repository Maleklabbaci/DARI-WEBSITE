
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Check, Zap, Crown, RefreshCcw, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardSubscription: React.FC = () => {
  const { user, updateSubscription } = useAuth();
  const { t, language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) return null;

  const formatPrice = (amount: number) => {
    return amount.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ');
  };

  const handleCancel = () => {
    if (window.confirm(t('common.confirm') + "?")) {
      setIsProcessing(true);
      setTimeout(() => {
        updateSubscription('free');
        setIsProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black uppercase tracking-tight">{t('dashboard.menu.sub')}</h1>
            <Link to="/pricing" className="text-blue-600 font-black text-sm hover:underline uppercase tracking-widest">{t('pricing.viewOffers')}</Link>
          </div>

          {user.subscription === 'free' ? (
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl p-16 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-inner">
                <CreditCard size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">{t('dashboard.sub.upsellTitle')}</h2>
              <p className="text-slate-500 max-w-lg mx-auto mb-12 font-medium leading-relaxed">
                {t('dashboard.sub.upsellDesc')}
              </p>
              <Link to="/pricing" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl active:scale-95 inline-block">
                {t('pricing.discoverOffers')}
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900 text-white relative">
                <div className="absolute top-0 end-0 w-64 h-full bg-blue-600 opacity-20 skew-x-12 translate-x-20"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white me-8 shadow-2xl">
                    <Crown size={40} />
                  </div>
                  <div className="text-start">
                    <h2 className="text-3xl font-black mb-1 capitalize tracking-tight">Dari {user.subscription}</h2>
                    <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">{t('dashboard.table.status')} : <span className="text-green-400">{t('common.active')}</span></p>
                  </div>
                </div>
                <div className="flex flex-col md:text-end relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('dashboard.sub.monthlyBilling')}</p>
                  <p className="text-2xl font-black gap-2 flex items-center justify-end">
                    {formatPrice(user.subscription === 'premium' ? 2500 : 6000)} 
                    <span className="text-sm font-bold text-slate-400">{t('common.da')}</span>
                  </p>
                </div>
              </div>
              <div className="p-10 bg-white flex flex-wrap gap-6 items-center justify-between border-t border-slate-100">
                <Link to="/pricing" className="flex items-center px-6 py-3 bg-slate-100 text-slate-900 font-black rounded-xl text-sm hover:bg-blue-600 hover:text-white transition group">
                  <RefreshCcw size={18} className="me-2 group-hover:rotate-180 transition duration-500" /> {t('dashboard.sub.changeOffer')}
                </Link>
                <button 
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="text-slate-400 font-black text-xs uppercase tracking-widest hover:text-red-500 transition flex items-center"
                >
                  {isProcessing ? <Loader2 size={14} className="animate-spin me-2" /> : null}
                  {t('dashboard.sub.cancel')}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-10 rounded-[2.5rem] border border-indigo-100 relative overflow-hidden group shadow-sm">
              <Zap className="absolute -end-4 -bottom-4 text-indigo-100 group-hover:scale-125 transition duration-700" size={120} />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-tight">{t('pricing.premiumTitle')}</h3>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center text-sm text-indigo-700 font-bold gap-3"><Check size={18} className="text-indigo-500 flex-shrink-0" /> {t('pricing.features.prem1')}</li>
                  <li className="flex items-center text-sm text-indigo-700 font-bold gap-3"><Check size={18} className="text-indigo-500 flex-shrink-0" /> {t('pricing.features.prem2')}</li>
                </ul>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-indigo-900">{formatPrice(2500)}</span>
                  <span className="text-indigo-400 font-bold text-sm">{t('common.da')} / {t('common.day').replace('jour', 'mois').replace('يوم', 'شهر')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group shadow-sm">
              <Crown className="absolute -end-4 -bottom-4 text-blue-100 group-hover:scale-125 transition duration-700" size={120} />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-blue-900 mb-6 uppercase tracking-tight">{t('pricing.ultimeTitle')}</h3>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center text-sm text-blue-700 font-bold gap-3"><Check size={18} className="text-blue-500 flex-shrink-0" /> {t('pricing.features.ult1')}</li>
                  <li className="flex items-center text-sm text-blue-700 font-bold gap-3"><Check size={18} className="text-blue-500 flex-shrink-0" /> {t('pricing.features.ult2')}</li>
                </ul>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-900">{formatPrice(6000)}</span>
                  <span className="text-blue-400 font-bold text-sm">{t('common.da')} / {t('common.day').replace('jour', 'mois').replace('يوم', 'شهر')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
