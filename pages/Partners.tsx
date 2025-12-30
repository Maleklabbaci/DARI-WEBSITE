
import React from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Handshake, Phone, ArrowRight, Wallet, Map as MapIcon, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Partners: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4 text-start">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Réseau National
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">{t('partners.title')}</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">{t('partners.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-10 shadow-inner">
              <Store size={32} />
            </div>
            <h2 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">{t('partners.findTitle')}</h2>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">{t('partners.findDesc')}</p>
            
            <div className="space-y-4 mb-12 flex-grow">
              {[
                { loc: "Alger - Bab Ezzouar (Cyber Immo)", dist: "2 km" },
                { loc: "Oran - Centre Ville (Boutique Dari)", dist: "Centre" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group cursor-pointer border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-4">
                    <MapPin className="text-blue-500 group-hover:scale-110 transition" size={20} />
                    <span className="font-bold text-slate-700">{item.loc}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.dist}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition shadow-xl flex items-center justify-center active:scale-95 gap-3">
              <MapIcon size={20} /> {t('partners.mapBtn')}
            </button>
          </div>

          <div className="bg-blue-600 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden flex flex-col">
            <div className="absolute top-0 end-0 w-80 h-80 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-10 shadow-xl backdrop-blur-md">
                <Handshake size={32} />
              </div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">{t('partners.becomeTitle')}</h2>
              <p className="text-blue-100 mb-10 font-medium leading-relaxed">{t('partners.becomeDesc')}</p>
              
              <ul className="space-y-6 mb-12 flex-grow">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center font-bold text-sm gap-4">
                    <div className="p-1 bg-white/20 rounded-lg text-blue-100 shadow-sm"><BadgeCheck size={18} /></div>
                    {t(`partners.perk${i}`)}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-block px-12 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition shadow-2xl text-center active:scale-95 uppercase tracking-widest text-sm">{t('partners.joinBtn')}</Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black mb-12 text-slate-400 uppercase tracking-[0.3em]">{t('partners.bankingTitle')}</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition duration-1000">
             <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">ALGERIE POSTE</div>
             <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">CIB / SATIM</div>
             <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">BNA</div>
             <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">BADR BANK</div>
          </div>
        </div>
      </div>
    </div>
  );
};
