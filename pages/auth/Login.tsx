
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
    setError(null);

    if (!email || !password) {
      setError(t('common.error'));
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-start">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('auth.loginTitle')}</h2>
        <p className="mt-2 text-sm text-slate-600">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-3xl sm:px-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-medium animate-in fade-in zoom-in-95">
              <AlertCircle size={18} className={`${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700">{t('auth.emailLabel')}</label>
              <div className="mt-1 relative">
                <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full ${language === 'ar' ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 transition`}
                  placeholder="Ex. mohamed@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">{t('auth.passwordLabel')}</label>
              <div className="mt-1 relative">
                <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full ${language === 'ar' ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 transition`}
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className={`${language === 'ar' ? 'mr-2' : 'ml-2'} block text-sm text-slate-700`}>
                  {t('auth.rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" title="Mot de passe oublié" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : t('auth.submitLogin')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-50">{t('auth.noAccount')}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition"
              >
                {t('header.signup')} <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
