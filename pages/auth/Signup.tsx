
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Building2, Wallet, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { WILAYAS } from '../../constants';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'individual' | 'agency'>( 'individual' );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    contactName: '',
    email: '',
    phone: '',
    wilaya: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (userType === 'individual' && !formData.fullName) return setError(t('common.error'));
    if (userType === 'agency' && !formData.agencyName) return setError(t('common.error'));
    if (!formData.email) return setError(t('common.error'));
    if (!formData.phone) return setError(t('common.error'));
    if (formData.password.length < 8) return setError(t('common.error'));
    if (formData.password !== formData.confirmPassword) return setError(t('common.error'));

    setIsSubmitting(true);
    try {
      await signup({ ...formData, type: userType });
      navigate('/dashboard');
    } catch (err: any) {
      setError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-start">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('auth.signupTitle')}</h2>
        <p className="mt-2 text-sm text-slate-600">{t('auth.signupSubtitle')}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 md:px-0">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-3xl sm:px-10">
          {/* User Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserType('individual')}
              className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${userType === 'individual' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-50' : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200'}`}
            >
              <UserIcon size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('auth.individual')}</span>
            </button>
            <button
              onClick={() => setUserType('agency')}
              className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${userType === 'agency' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-50' : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200'}`}
            >
              <Building2 size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('auth.agency')}</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-medium animate-in fade-in zoom-in-95">
              <AlertCircle size={18} className="me-3 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {userType === 'individual' ? (
              <div className="space-y-4 animate-in slide-in-from-start-4 fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">{t('auth.fullName')}</label>
                  <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ex. Mohamed Benali" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-end-4 fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">{t('auth.agencyName')}</label>
                  <input name="agencyName" type="text" value={formData.agencyName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ex. Agence El Amana" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">{t('auth.contactName')}</label>
                    <input name="contactName" type="text" value={formData.contactName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ex. Yacine B." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">{t('common.wilaya')}</label>
                    <select name="wilaya" value={formData.wilaya} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none">
                      <option value="">--</option>
                      {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">{t('auth.emailLabel')}</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ex. mohamed@gmail.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">{t('auth.phone')}</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ex. 0550 00 00 00" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">{t('auth.passwordLabel')}</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Min. 8 chars" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">{t('auth.confirmPasswordLabel')}</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="..." />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[10px] text-slate-400 leading-normal mb-4">
                {t('auth.termsAccept')}
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-100 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : t('auth.submitSignup')}
              </button>
              <p className="mt-4 text-center text-[10px] text-blue-600 font-bold uppercase tracking-widest bg-blue-50 py-2 rounded-lg border border-blue-100">
                {t('auth.bonus')}
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-sm text-slate-500 font-medium">{t('auth.hasAccount')} <Link to="/login" className="text-blue-600 font-bold hover:underline">{t('header.login')}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
