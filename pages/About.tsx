
import React from 'react';
import { ShieldCheck, Users, Target, MapPin, BadgeCheck, CheckCircle2, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <div className="bg-slate-50 min-h-screen text-start">
      <section className="bg-blue-600 py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight uppercase">{t('about.title')}</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">{t('about.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
              {t('about.missionTitle')}
            </div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">{t('about.missionText')}</h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 font-medium">
              {t('about.missionDesc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
                  <span className="font-bold text-slate-700 text-sm">{t(`about.feature${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-16 rounded-[4rem] shadow-2xl relative z-10 border border-slate-100">
               <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl shadow-blue-100">
                 <Target size={40} />
               </div>
              <p className="text-3xl font-black text-slate-900 mb-6 leading-tight">"{t('about.quote')}"</p>
              <p className="text-blue-600 font-black uppercase tracking-widest text-sm">- {t('about.team')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck size={48} />, color: "text-green-600", key: "card1" },
            { icon: <Users size={48} />, color: "text-blue-600", key: "card2" },
            { icon: <MapIcon size={48} />, color: "text-orange-600", key: "card3" }
          ].map((card, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center flex flex-col items-center">
              <div className={`mb-8 p-6 bg-slate-50 rounded-[2rem] ${card.color} shadow-inner`}>{card.icon}</div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 uppercase tracking-tight">{t(`about.${card.key}Title`)}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{t(`about.${card.key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
