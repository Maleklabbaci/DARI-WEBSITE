
import React, { useState } from 'react';
import { Search, MapPin, Building, Key, ArrowRight, Wallet, Store, Briefcase, UserPlus, SearchCheck, MessageCircle, Heart, Star, TrendingUp, PlusCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { WILAYAS, PROPERTY_TYPES, MOCK_PROPERTIES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { PropertyCard } from '../components/PropertyCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState({ wilaya: '', type: 'all', transaction: 'buy' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?w=${search.wilaya}&t=${search.transaction}&p=${search.type}`);
  };

  return (
    <div className="animate-in fade-in duration-500 text-start">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 end-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20 rtl:-translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            {t('home.heroDesc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/search" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center">
              {t('home.discoverAds')} <ArrowRight className="ms-2 rtl:rotate-180" size={18} />
            </Link>
            <Link to={isAuthenticated ? "/create-listing" : "/login"} className="w-full sm:w-auto px-8 py-4 bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition flex items-center justify-center">
              {t('home.postFree')}
            </Link>
          </div>
          
          <div className="bg-blue-800/40 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-2 inline-flex items-center text-sm text-white">
            <Wallet className="me-2" size={16} />
            {t('home.bonus')}
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="max-w-5xl mx-auto mt-16 transform translate-y-12 px-4">
          <form onSubmit={handleSearch} className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-100">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ms-1">{t('home.searchLocation')}</label>
              <div className="relative">
                <MapPin className="absolute start-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                <select 
                  className="w-full ps-11 pe-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition appearance-none"
                  value={search.wilaya}
                  onChange={e => setSearch({...search, wilaya: e.target.value})}
                >
                  <option value="">{t('common.searchPlaceholder')}</option>
                  {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ms-1">{t('home.searchTransaction')}</label>
              <div className="relative">
                <Key className="absolute start-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                <select 
                  className="w-full ps-11 pe-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition appearance-none"
                  value={search.transaction}
                  onChange={e => setSearch({...search, transaction: e.target.value})}
                >
                  <option value="buy">{t('header.buy')}</option>
                  <option value="rent">{t('header.rent')}</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ms-1">{t('home.searchProperty')}</label>
              <div className="relative">
                <Building className="absolute start-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                <select 
                  className="w-full ps-11 pe-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition appearance-none"
                  value={search.type}
                  onChange={e => setSearch({...search, type: e.target.value})}
                >
                  <option value="all">{t('common.allTypes')}</option>
                  {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl py-4 flex items-center justify-center transition shadow-xl shadow-blue-100 active:scale-95">
                <Search className="me-2" size={20} /> {t('home.searchBtn')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Latest Ops */}
      <section className="pt-48 pb-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-slate-900 uppercase tracking-tight">{t('home.latestOpportunities')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_PROPERTIES.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
