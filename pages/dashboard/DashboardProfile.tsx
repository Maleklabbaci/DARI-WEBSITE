
import React, { useState } from 'react';
import { 
  Camera, CheckCircle, Globe, FileText, Loader2, CheckCircle2, 
  Phone, MessageSquare, MapPin, Bell, Lock, Trash2, Facebook, 
  Instagram, Clock, ShieldCheck, AlertCircle, ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { WILAYAS } from '../../constants';

export const DashboardProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t, language } = useLanguage();
  const [accountType, setAccountType] = useState<'individual' | 'agency'>(user?.type || 'individual');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    whatsapp: user.whatsapp || '',
    wilaya: user.wilaya || 'Alger',
    city: user.city || '',
    language: user.language || 'fr',
    notifications: user.notifications || { email: true, sms: false, news: true },
    agencyName: user.agencyName || '',
    agencyPhone: user.agencyPhone || '',
    agencyWhatsapp: user.agencyWhatsapp || '',
    agencyAddress: user.agencyAddress || '',
    openingHours: user.openingHours || '',
    facebook: user.facebook || '',
    instagram: user.instagram || '',
    website: user.website || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      updateProfile({ ...formData, type: accountType });
      setIsUpdating(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          {showSuccess && (
            <div className="bg-green-50 border border-green-100 text-green-700 p-6 rounded-[2rem] flex items-center animate-in fade-in zoom-in-95 shadow-lg shadow-green-100/20">
              <CheckCircle2 size={24} className="me-3 flex-shrink-0" />
              <span className="font-black">{t('common.success')}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">{t('dashboard.profile.title')}</h1>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200">
              <button 
                onClick={() => setAccountType('individual')}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${accountType === 'individual' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t('auth.individual')}
              </button>
              <button 
                onClick={() => setAccountType('agency')}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${accountType === 'agency' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t('auth.agency')}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-12 mb-16 pb-16 border-b border-slate-50">
                <div className="relative">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-blue-600 border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center text-white text-5xl font-black">
                    {formData.name.charAt(0)}
                  </div>
                  <button className={`absolute bottom-2 ${language === 'ar' ? 'left-2' : 'right-2'} p-3.5 bg-slate-900 text-white rounded-2xl shadow-2xl border-4 border-white hover:bg-black transition-all hover:scale-110 active:scale-95`}>
                    <Camera size={20} />
                  </button>
                </div>
                <div className="text-center md:text-start">
                  <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{user.name}</h2>
                  <p className="text-slate-500 font-bold mb-4">{t('auth.signupSubtitle')}</p>
                  
                  {user.isVerified ? (
                    <div className="inline-flex items-center px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-green-100 shadow-sm">
                      <ShieldCheck size={14} className="me-2" /> {t('dashboard.profile.verified')}
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="inline-flex items-center px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200">
                        <AlertCircle size={14} className="me-2" /> {t('dashboard.profile.unverified')}
                      </div>
                      <button className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                        {t('dashboard.profile.requestVerify')}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form className="space-y-16" onSubmit={handleSubmit}>
                <section className="space-y-8">
                  <h3 className="text-lg font-black text-slate-900 flex items-center uppercase tracking-tight">
                    <FileText className="me-3 text-blue-600" size={24} /> 
                    {accountType === 'individual' ? t('dashboard.profile.personalInfo') : t('dashboard.profile.agencyInfo')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{accountType === 'individual' ? t('auth.fullName') : t('auth.agencyName')}</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-50 transition font-bold text-slate-700" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('auth.emailLabel')}</label>
                      <input type="email" className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-4 outline-none cursor-not-allowed text-slate-400 font-bold" defaultValue={user.email} disabled />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('auth.phone')}</label>
                      <div className="relative">
                        <Phone className={`absolute ${language === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-blue-600`} size={18} />
                        <input 
                          type="tel" 
                          className={`w-full ${language === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold`} 
                          placeholder="0550 00 00 00"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">WhatsApp</label>
                      <div className="relative">
                        <MessageSquare className={`absolute ${language === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-green-500`} size={18} />
                        <input 
                          type="tel" 
                          className={`w-full ${language === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold`} 
                          placeholder="0550 00 00 00"
                          value={formData.whatsapp}
                          onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('common.wilaya')}</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-50 transition font-bold"
                        value={formData.wilaya}
                        onChange={e => setFormData({...formData, wilaya: e.target.value})}
                      >
                        {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('common.city')}</label>
                      <input 
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-slate-50">
                  <div className="space-y-8">
                    <h3 className="text-lg font-black text-slate-900 flex items-center uppercase tracking-tight">
                      <Bell className="me-3 text-blue-600" size={24} /> {t('dashboard.profile.notifs')}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: t('dashboard.profile.notifEmail') },
                        { key: 'sms', label: t('dashboard.profile.notifSms') },
                        { key: 'news', label: t('dashboard.profile.notifNews') }
                      ].map((pref) => (
                        <label key={pref.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-100 transition-all group">
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{pref.label}</span>
                          <input 
                            type="checkbox" 
                            className="w-6 h-6 rounded text-blue-600 border-slate-200 focus:ring-blue-500"
                            checked={(formData.notifications as any)[pref.key]}
                            onChange={(e) => setFormData({
                              ...formData, 
                              notifications: { ...formData.notifications, [pref.key]: e.target.checked }
                            })}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-lg font-black text-slate-900 flex items-center uppercase tracking-tight">
                      <Lock className="me-3 text-blue-600" size={24} /> {t('dashboard.profile.safety')}
                    </h3>
                    <div className="space-y-4">
                      <button type="button" className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition shadow-sm group">
                        <span className="text-sm font-black text-slate-700">{t('dashboard.profile.changePass')}</span>
                        <Lock size={18} className="text-slate-400 group-hover:text-blue-600 transition" />
                      </button>

                      <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100">
                        <h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-2 flex items-center">
                          <ShieldAlert size={14} className="me-2" /> {t('dashboard.profile.safety')}
                        </h4>
                        <p className="text-[10px] text-red-400 font-medium mb-4">{t('dashboard.profile.safetyDesc')}</p>
                        <div className="flex gap-3">
                          <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition">
                            {t('dashboard.profile.deactivate')}
                          </button>
                          <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                            {t('dashboard.profile.delete')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="pt-16 border-t border-slate-50 flex items-center justify-end">
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-16 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl active:scale-95 disabled:opacity-50 flex items-center justify-center uppercase tracking-widest text-sm"
                  >
                    {isUpdating ? <Loader2 className="animate-spin me-3" size={20} /> : null}
                    {t('common.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
