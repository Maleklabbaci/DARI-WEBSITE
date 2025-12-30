
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ForgotPassword: React.FC = () => {
  const { t, language } = useLanguage();
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-start">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition">
          {language === 'ar' ? <ChevronRight size={16} className="ml-1" /> : <ChevronLeft size={16} className="mr-1" />}
          {t('auth.backToLogin')}
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('auth.forgotPasswordTitle')}</h2>
        {!sent ? (
          <p className="mt-2 text-sm text-slate-600">
            {t('auth.forgotPasswordDesc')}
          </p>
        ) : (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start">
            <CheckCircle className="text-green-500 me-3 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-green-800 font-medium">
              {t('auth.forgotPasswordSent')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {!sent && (
          <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-3xl sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="block text-sm font-bold text-slate-700">{t('auth.emailLabel')}</label>
                <div className="mt-1 relative">
                  <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                  <input
                    type="email"
                    required
                    className={`appearance-none block w-full ${language === 'ar' ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 sm:text-sm bg-slate-50 transition`}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95"
                >
                  {t('auth.submitReset')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
