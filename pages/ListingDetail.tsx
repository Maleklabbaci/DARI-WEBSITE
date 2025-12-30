
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, Ruler, Calendar, Shield, Share2, Heart, Phone, MessageSquare, ChevronLeft, ChevronRight, BadgeCheck, Lock, CheckCircle2, AlertCircle, Map as MapIcon } from 'lucide-react';
import { MOCK_PROPERTIES, PROPERTY_TYPES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isAuthenticated, user, updateBalance, incrementPhoneUnlocks, stats, isFavorite, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const [phoneState, setPhoneState] = useState<'hidden' | 'unlocking' | 'visible'>('hidden');
  const [error, setError] = useState<string | null>(null);

  if (!property) return null;

  const handleUnlock = () => {
    if (!isAuthenticated) {
      navigate(`/${language}/login`);
      return;
    }
    const isFree = incrementPhoneUnlocks();
    if (isFree) {
      setPhoneState('unlocking');
      setTimeout(() => setPhoneState('visible'), 800);
      return;
    }
    if (user!.balance < 200) {
      setError(t('listing.insufficientBalance'));
      return;
    }
    setPhoneState('unlocking');
    setTimeout(() => {
      updateBalance(-200);
      setPhoneState('visible');
    }, 800);
  };

  const getUnlockMessage = () => {
    if (user?.subscription !== 'free') return t('listing.unlockSub');
    if (stats.phoneUnlocksToday < 3) return t('listing.unlockFree').replace('{n}', (3 - stats.phoneUnlocksToday).toString());
    return t('listing.unlockCost');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-start">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={`/${language}/search`} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition gap-2">
          <ChevronLeft size={16} className="rtl:rotate-180" /> {t('listing.back')}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 mb-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{property.title}</h1>
                  <div className="flex items-center text-slate-500 font-medium">
                    <MapPin size={20} className="me-2 text-blue-600" />
                    {property.city}, {property.wilaya}
                  </div>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-50">
                  <p className="text-4xl font-black text-blue-600">
                    {property.price.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ')} <span className="text-xl font-bold">DA</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-y border-slate-50 my-10">
                <div className="flex flex-col items-center">
                  <Building size={28} className="text-blue-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('listing.type')}</span>
                  <span className="font-bold">{PROPERTY_TYPES.find(t => t.value === property.type)?.label}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Ruler size={28} className="text-blue-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('search.surface')}</span>
                  <span className="font-bold">{property.surface} m²</span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar size={28} className="text-blue-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('listing.rooms')}</span>
                  <span className="font-bold">{property.rooms || '-'}</span>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 border-s-4 border-blue-600 ps-4">{t('listing.description')}</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">{property.description}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                <div className="space-y-4">
                  <button className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center hover:bg-blue-700 transition shadow-xl shadow-blue-100 gap-3">
                    <MessageSquare size={20} /> {t('listing.sendMessage')}
                  </button>
                  
                  {phoneState === 'hidden' ? (
                    <button onClick={handleUnlock} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex flex-col items-center justify-center hover:bg-black transition shadow-xl active:scale-95">
                      <div className="flex items-center gap-2">
                        <Lock size={18} className="text-blue-500" /> {t('listing.unlockPhone')}
                      </div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">{getUnlockMessage()}</span>
                    </button>
                  ) : phoneState === 'unlocking' ? (
                    <div className="w-full py-5 bg-slate-100 text-slate-400 font-bold rounded-2xl flex items-center justify-center animate-pulse">
                      {t('listing.unlocking')}
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-100 text-center animate-in zoom-in-95">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.3em] mb-2 flex items-center justify-center gap-1">
                        <CheckCircle2 size={12} /> {t('listing.unlocked')}
                      </p>
                      <a href="tel:0550123456" className="text-2xl font-black text-slate-900 hover:text-blue-600 transition">05 50 12 34 56</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
