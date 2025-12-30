
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, Ruler, Calendar, Shield, Share2, Heart, Phone, MessageSquare, ChevronLeft, ChevronRight, BadgeCheck, Lock, CheckCircle2, AlertCircle, Map as MapIcon } from 'lucide-react';
import { MOCK_PROPERTIES, PROPERTY_TYPES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const { isAuthenticated, user, updateBalance, incrementPhoneUnlocks, stats, isFavorite, toggleFavorite } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const [phoneState, setPhoneState] = useState<'hidden' | 'unlocking' | 'visible'>('hidden');
  const [error, setError] = useState<string | null>(null);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-12 rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-bold mb-4">{t('listing.notFound')}</h2>
          <p className="text-slate-500 mb-8">{t('listing.notFoundDesc')}</p>
          <Link to="/search" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">{t('listing.backToSearch')}</Link>
        </div>
      </div>
    );
  }

  const handleUnlock = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const isFree = incrementPhoneUnlocks();
    
    if (isFree) {
      setPhoneState('unlocking');
      setTimeout(() => setPhoneState('visible'), 800);
      return;
    }

    // If not free, check balance
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

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) return navigate('/login');
    toggleFavorite(property.id);
  };

  const getUnlockMessage = () => {
    if (user?.subscription !== 'free') return t('listing.unlockSub');
    if (stats.phoneUnlocksToday < 3) return t('listing.unlockFree').replace('{n}', (3 - stats.phoneUnlocksToday).toString());
    return t('listing.unlockCost');
  };

  const mapUrl = property.lat && property.lng 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.01}%2C${property.lat - 0.005}%2C${property.lng + 0.01}%2C${property.lat + 0.005}&layer=mapnik&marker=${property.lat}%2C${property.lng}`
    : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-start">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/search" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition">
          {language === 'ar' ? <ChevronRight size={16} className="ml-2" /> : <ChevronLeft size={16} className="mr-2" />} 
          {t('listing.back')}
        </Link>
      </div>

      {/* Gallery Section */}
      <section className="bg-white border-b border-slate-100 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[550px]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] shadow-lg">
              <img src={property.images[0]} alt="Principal" className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm">
              <img src="https://picsum.photos/seed/room1/800/600" alt="Room" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm">
              <img src="https://picsum.photos/seed/room2/800/600" alt="Kitchen" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm relative group cursor-pointer">
              <img src="https://picsum.photos/seed/room3/800/600" alt="Bath" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition flex items-center justify-center text-white text-lg font-bold">
                +{property.images.length + 5} {language === 'ar' ? 'صور' : 'Photos'}
              </div>
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm">
              <img src="https://picsum.photos/seed/exterior/800/600" alt="Ext" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 mb-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                <div>
                  <div className="flex gap-2 mb-4">
                    <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg border border-blue-100">
                      {property.transaction === 'buy' ? t('header.buy') : t('header.rent')}
                    </span>
                    <span className="inline-block bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg border border-slate-100">
                      ID: #{property.id}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{property.title}</h1>
                  <div className="flex items-center text-slate-500 font-medium">
                    <MapPin size={20} className="me-2 text-blue-600" />
                    {property.city}, {property.wilaya}
                  </div>
                </div>
                <div className={`md:text-end bg-blue-50/50 p-6 rounded-[2rem] border border-blue-50`}>
                  <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">{t('common.price')}</p>
                  <p className="text-4xl font-black text-blue-600">
                    {property.price.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ')} <span className="text-xl font-bold">{t('common.da')}</span>
                  </p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-y border-slate-50 my-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Building size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('listing.type')}</span>
                  <span className="font-bold text-slate-800">{PROPERTY_TYPES.find(v => v.value === property.type)?.label}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Ruler size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('common.surface')}</span>
                  <span className="font-bold text-slate-800">{property.surface} m²</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Calendar size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('common.rooms')}</span>
                  <span className="font-bold text-slate-800">{property.rooms || '-'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Shield size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('common.floor')}</span>
                  <span className="font-bold text-slate-800">{property.floor || '-'}</span>
                </div>
              </div>

              <div className="mb-12">
                <h3 className={`text-2xl font-bold mb-6 text-slate-900 border-blue-600 flex items-center ${language === 'ar' ? 'border-r-4 pr-4' : 'border-l-4 ps-4'}`}>
                  {t('listing.description')}
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg mb-10">
                  {property.description}
                </p>
              </div>

              {/* Map Section */}
              {mapUrl && (
                <div className="mb-8">
                  <h3 className={`text-2xl font-bold mb-6 text-slate-900 border-blue-600 flex items-center ${language === 'ar' ? 'border-r-4 pr-4' : 'border-l-4 ps-4'}`}>
                    <MapIcon size={24} className="me-3 text-blue-600" /> {t('home.searchLocation')}
                  </h3>
                  <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg">
                    <iframe 
                      title="Localisation du bien"
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight={0} 
                      marginWidth={0} 
                      src={mapUrl}
                      className="grayscale-[0.2] contrast-[1.1]"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[2.5rem]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 border border-slate-100 flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner overflow-hidden">
                    <img src={`https://picsum.photos/seed/${property.sellerName}/200/200`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="text-start">
                    <div className="flex items-center">
                      <h4 className="font-black text-xl text-slate-900">{property.sellerName}</h4>
                      {property.sellerType === 'agency' && (
                        <BadgeCheck size={20} className="text-blue-600 ms-2" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                      {property.sellerType === 'agency' ? t('header.offices') : t('auth.individual')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg flex items-center mb-4 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={14} className="me-2" /> {error}
                    </div>
                  )}

                  <button className="group w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95">
                    <MessageSquare className="me-3 group-hover:scale-110 transition" size={20} /> {t('listing.sendMessage')}
                  </button>
                  
                  {phoneState === 'hidden' ? (
                    <button 
                      onClick={handleUnlock}
                      className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex flex-col items-center justify-center hover:bg-black transition shadow-xl shadow-slate-200 active:scale-95"
                    >
                      <div className="flex items-center mb-0.5">
                        <Lock className="me-3 text-blue-500" size={18} /> {t('listing.unlockPhone')}
                      </div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest">{getUnlockMessage()}</span>
                    </button>
                  ) : phoneState === 'unlocking' ? (
                    <div className="w-full py-5 bg-slate-100 text-slate-400 font-bold rounded-2xl flex items-center justify-center animate-pulse">
                      {t('common.loading')}
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-100 text-center animate-in zoom-in-95">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.3em] mb-2 flex items-center justify-center">
                        <CheckCircle2 size={12} className="me-1" /> {t('listing.unlocked')}
                      </p>
                      <a href="tel:0550123456" className="text-2xl font-black text-slate-900 hover:text-blue-600 transition">05 50 12 34 56</a>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse pt-6">
                    <button 
                      onClick={handleFavoriteToggle}
                      className={`p-4 rounded-full transition-all duration-300 shadow-sm ${isFavorite(property.id) ? 'bg-red-50 text-red-500 shadow-red-100 border border-red-100' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <Heart size={24} fill={isFavorite(property.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-4 bg-slate-50 rounded-full text-slate-400 border border-slate-100 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
