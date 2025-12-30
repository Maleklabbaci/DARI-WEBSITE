
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, CreditCard, QrCode, CheckCircle, ArrowRight, Loader2, Info, TrendingUp, Lock, Crown, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardBalance: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const { t, language } = useLanguage();
  const [rechargeCode, setRechargeCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rechargeAmount, setRechargeAmount] = useState<number | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (!user) return null;

  const formatPrice = (amount: number) => {
    return amount.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ');
  };

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (rechargeCode.length >= 8) {
      setStatus('loading');
      setTimeout(() => {
        updateBalance(2000); 
        setStatus('success');
        setRechargeCode('');
        setTimeout(() => setStatus('idle'), 3000);
      }, 1200);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleRecharge = () => {
    if (!rechargeAmount) return;
    setPaymentLoading(true);
    setTimeout(() => {
      updateBalance(rechargeAmount);
      setPaymentLoading(false);
      setRechargeAmount(null);
    }, 1500);
  };

  const quickAmounts = [
    { label: `+ ${formatPrice(1000)} ${t('common.da')}`, value: 1000 },
    { label: `+ ${formatPrice(2500)} ${t('common.da')}`, value: 2500 },
    { label: `+ ${formatPrice(6000)} ${t('common.da')}`, value: 6000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{t('dashboard.wallet.title')}</h1>
               <p className="text-sm font-medium text-slate-500 mt-1">{t('dashboard.wallet.desc')}</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 end-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><Wallet size={18} /></div>
                <p className="text-xs font-black text-blue-200 uppercase tracking-[0.3em]">{t('dashboard.wallet.available')}</p>
              </div>
              <h2 className="text-6xl font-black mb-12 tracking-tight flex items-baseline gap-4">
                {formatPrice(user.balance)} 
                <span className="text-2xl font-bold text-slate-500 tracking-normal">{t('common.da')}</span>
              </h2>
              
              <div className="p-5 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <p className="text-xs font-medium text-blue-100 leading-relaxed">
                    {t('dashboard.wallet.available')}
                 </p>
              </div>
            </div>
          </div>

          {/* Usage Cards */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight flex items-center gap-3">
               <Info className="text-blue-600 flex-shrink-0" size={24} /> {t('dashboard.wallet.usageTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp className="text-blue-600" />, title: t('dashboard.wallet.usageBoost'), desc: t('dashboard.wallet.usageBoostDesc') },
                { icon: <Lock className="text-orange-600" />, title: t('listing.unlockPhone'), desc: t('dashboard.wallet.usageUnlockDesc') },
                { icon: <Crown className="text-purple-600" />, title: t('pricing.ultimeTitle'), desc: t('dashboard.wallet.usageSubDesc') },
                { icon: <PlusCircle className="text-green-600" />, title: t('dashboard.postAd'), desc: t('dashboard.noDataDesc') }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-100 transition duration-300">
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      {item.icon}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recharge Form */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
              <h3 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight flex items-center gap-3">
                 <CreditCard className="text-blue-600 flex-shrink-0" size={24} /> {t('dashboard.wallet.rechargeTitle')}
              </h3>
              
              <div className="space-y-4 mb-10">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ms-1">{t('dashboard.wallet.amountLabel')}</p>
                 <div className="grid grid-cols-2 gap-3">
                    {quickAmounts.map((amt) => (
                      <button 
                        key={amt.value}
                        onClick={() => setRechargeAmount(amt.value)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 font-bold text-xs ${rechargeAmount === amt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-blue-200'}`}
                      >
                        {amt.label}
                      </button>
                    ))}
                    <input 
                      type="number" 
                      placeholder={language === 'ar' ? 'مبلغ آخر' : 'Other amount'}
                      onChange={(e) => setRechargeAmount(parseInt(e.target.value))}
                      className="p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none transition"
                    />
                 </div>
              </div>

              <button 
                onClick={handleRecharge}
                disabled={paymentLoading || !rechargeAmount}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95 mt-auto disabled:opacity-50 flex items-center justify-center"
              >
                 {paymentLoading ? <Loader2 className="animate-spin" /> : t('common.confirm')}
              </button>
            </div>

            {/* Code Form */}
            <div className="bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl text-white flex flex-col h-full relative overflow-hidden">
              <div className="absolute bottom-0 end-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                 <QrCode className="flex-shrink-0" size={24} /> {t('dashboard.wallet.codeTitle')}
              </h3>
              <p className="text-sm text-blue-100 font-medium mb-10 leading-relaxed">
                {t('dashboard.wallet.codeDesc')}
              </p>
              
              <form onSubmit={handleValidateCode} className="space-y-4">
                <input 
                  type="text" 
                  value={rechargeCode}
                  onChange={(e) => setRechargeCode(e.target.value.toUpperCase())}
                  placeholder={t('dashboard.wallet.codePlaceholder')} 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 font-black text-white text-center tracking-[0.3em] outline-none focus:bg-white/20 transition placeholder:text-blue-300 placeholder:tracking-normal placeholder:font-bold"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition shadow-2xl shadow-blue-900/30 active:scale-95 disabled:opacity-50 flex items-center justify-center"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : t('dashboard.wallet.codeBtn')}
                </button>
              </form>

              <div className="mt-auto pt-10">
                <Link to="/partners" className="text-xs font-black text-blue-200 hover:text-white transition uppercase tracking-widest flex items-center gap-2">
                   {t('dashboard.wallet.codeWhere')} <ArrowRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
