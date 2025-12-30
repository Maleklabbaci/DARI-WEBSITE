
import React, { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4 text-start">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="animate-in slide-in-from-start-8 duration-700">
          <h1 className="text-5xl font-black mb-8 text-slate-900 tracking-tight uppercase">{t('footer.contact')}</h1>
          <p className="text-xl text-slate-600 mb-12 font-medium leading-relaxed">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-center space-x-6 rtl:space-x-reverse p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner flex-shrink-0">
                <Mail size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('contact.emailDirect')}</p>
                <p className="text-xl font-black text-slate-900">contact@dari.dz</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner flex-shrink-0">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('contact.supportLocal')}</p>
                <p className="text-xl font-black text-slate-900">021 00 00 00</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="#" className="p-4 bg-white border border-slate-200 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition shadow-xl shadow-slate-100 hover:-translate-y-1 transform active:scale-95">
              <Facebook size={24} />
            </a>
            <a href="#" className="p-4 bg-white border border-slate-200 rounded-2xl text-pink-600 hover:bg-pink-600 hover:text-white transition shadow-xl shadow-slate-100 hover:-translate-y-1 transform active:scale-95">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden animate-in slide-in-from-end-8 duration-700">
          <div className="absolute top-0 end-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-green-50">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">{t('contact.sentTitle')}</h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">{t('contact.sentDesc')}</p>
              <button 
                onClick={() => setIsSent(false)}
                className="px-10 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg active:scale-95"
              >
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('auth.fullName')}</label>
                  <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition font-bold" placeholder="..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('auth.emailLabel')}</label>
                  <input required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition font-bold" placeholder="..." />
                </div>
              </div>
              <div className="space-y-2 text-start">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('contact.subject')}</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition font-bold appearance-none">
                  <option>Support Technique</option>
                  <option>Facturation / Solde</option>
                  <option>Partenariat</option>
                  <option>Devenir point de recharge</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('contact.message')}</label>
                <textarea required rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-blue-50 outline-none transition font-medium" placeholder="..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-100 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin me-3" size={24} /> : <Send size={20} className="me-3" />}
                {t('common.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
