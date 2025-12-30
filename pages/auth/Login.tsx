
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(`/${language}/dashboard`);
    } catch (err: any) {
      setError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-start">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('auth.loginTitle')}</h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">{t('auth.loginSubtitle')}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl border border-slate-100 rounded-[2.5rem]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-xs font-black uppercase tracking-widest border border-red-100">
               <AlertCircle size={16} className="me-2" /> {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('auth.emailLabel')}</label>
              <input type="email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">{t('auth.passwordLabel')}</label>
              <input type="password" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs font-bold text-slate-500 cursor-pointer">
                <input type="checkbox" className="me-2 rounded text-blue-600" /> {t('auth.rememberMe')}
              </label>
              <Link to={`/${language}/forgot-password`} className="text-xs font-bold text-blue-600">{t('auth.forgotPassword')}</Link>
            </div>

            <button disabled={isSubmitting} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center active:scale-95">
              {isSubmitting ? <Loader2 className="animate-spin" /> : t('auth.submitLogin')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              {t('auth.noAccount')} <Link to={`/${language}/signup`} className="text-blue-600 font-black hover:underline">{t('auth.submitSignup')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
