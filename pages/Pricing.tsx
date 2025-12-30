
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const Pricing: React.FC = () => {
  const { isAuthenticated, user, updateSubscription } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const formatPrice = (amount: number) => {
    return amount.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ');
  };

  const handleChoose = (plan: 'free' | 'premium' | 'ultime') => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    if (user?.subscription === plan) return;

    setLoadingPlan(plan);
    setTimeout(() => {
      updateSubscription(plan);
      setLoadingPlan(null);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 py-24 text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">{t('pricing.title')}</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">{t('pricing.desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Free Tier */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
            {user?.subscription === 'free' && (
              <div className="absolute top-4 end-4 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t('pricing.current')}</div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{t('pricing.freeTitle')}</h3>
              <p className="text-slate-500 text-sm">{t('pricing.freeDesc')}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-black">{formatPrice(0)}</span>
                <span className="text-slate-400 font-bold">{t('common.da')} / {t('common.day').replace('jour', 'mois').replace('يوم', 'شهر')}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start text-sm gap-3"><Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.free1')}</li>
              <li className="flex items-start text-sm font-bold text-blue-600 gap-3"><Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.free2')}</li>
            </ul>
            <button 
              onClick={() => handleChoose('free')}
              disabled={loadingPlan !== null || user?.subscription === 'free'}
              className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-xl text-center hover:bg-slate-200 transition active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'free' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'free' ? t('pricing.current') : t('pricing.choose')}
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-blue-600 shadow-2xl relative flex flex-col scale-105 z-10">
            <div className="absolute top-0 end-10 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              {language === 'ar' ? 'الأكثر طلباً' : 'Populaire'}
            </div>
            {user?.subscription === 'premium' && (
              <div className="absolute top-4 end-4 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t('pricing.current')}</div>
            )}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-blue-600" size={20} />
                <h3 className="text-xl font-bold">{t('pricing.premiumTitle')}</h3>
              </div>
              <p className="text-slate-500 text-sm">{t('pricing.premiumDesc')}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-blue-600">{formatPrice(2500)}</span>
                <span className="text-slate-400 font-bold">{t('common.da')} / {t('common.day').replace('jour', 'mois').replace('يوم', 'شهر')}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start text-sm font-bold gap-3"><Check className="text-blue-600 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.prem1')}</li>
              <li className="flex items-start text-sm gap-3"><Check className="text-blue-600 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.prem2')}</li>
              <li className="flex items-start text-sm font-bold text-blue-600 gap-3"><Check className="text-blue-600 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.prem3')}</li>
            </ul>
            <button 
              onClick={() => handleChoose('premium')}
              disabled={loadingPlan !== null || user?.subscription === 'premium'}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-center hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'premium' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'premium' ? t('pricing.current') : t('pricing.choose')}
            </button>
          </div>

          {/* Ultime Tier */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col relative overflow-hidden group">
            <Crown className="absolute -end-4 -top-4 text-white/5 group-hover:scale-125 transition duration-500" size={150} />
            {user?.subscription === 'ultime' && (
              <div className="absolute top-4 end-4 text-white bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t('pricing.current')}</div>
            )}
            <div className="mb-8 relative z-10">
              <h3 className="text-xl font-bold mb-2">{t('pricing.ultimeTitle')}</h3>
              <p className="text-slate-400 text-sm">{t('pricing.ultimeDesc')}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{formatPrice(6000)}</span>
                <span className="text-slate-500 font-bold">{t('common.da')} / {t('common.day').replace('jour', 'mois').replace('يوم', 'شهر')}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              <li className="flex items-start text-sm gap-3"><ShieldCheck className="text-blue-400 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.prem1')}</li>
              <li className="flex items-start text-sm font-bold gap-3"><Check className="text-blue-400 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.ult1')}</li>
              <li className="flex items-start text-sm gap-3"><Check className="text-blue-400 mt-0.5 flex-shrink-0" size={18} /> {t('pricing.features.ult2')}</li>
            </ul>
            <button 
              onClick={() => handleChoose('ultime')}
              disabled={loadingPlan !== null || user?.subscription === 'ultime'}
              className="w-full py-4 bg-white text-slate-900 font-black rounded-xl text-center hover:bg-slate-50 transition relative z-10 shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'ultime' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'ultime' ? t('pricing.current') : t('pricing.choose')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
