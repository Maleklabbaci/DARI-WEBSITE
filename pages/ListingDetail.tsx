
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, Ruler, Calendar, Shield, Share2, Heart, Phone, MessageSquare, ChevronLeft, ChevronRight, BadgeCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_PROPERTIES, PROPERTY_TYPES } from '../constants';
import { useAuth } from '../context/AuthContext';

export const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const { isAuthenticated, user, updateBalance, incrementPhoneUnlocks, stats } = useAuth();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const [phoneState, setPhoneState] = useState<'hidden' | 'unlocking' | 'visible'>('hidden');
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-12 rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Annonce introuvable</h2>
          <p className="text-slate-500 mb-8">Ce bien n'existe plus ou a été retiré.</p>
          <Link to="/search" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">Retour aux recherches</Link>
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
      setError("Limite gratuite atteinte (3/jour) et solde insuffisant (200 DA requis).");
      return;
    }

    setPhoneState('unlocking');
    setTimeout(() => {
      updateBalance(-200);
      setPhoneState('visible');
    }, 800);
  };

  const getUnlockMessage = () => {
    if (user?.subscription !== 'free') return "Inclus dans votre abonnement";
    if (stats.phoneUnlocksToday < 3) return `Gratuit (${3 - stats.phoneUnlocksToday} restants aujourd'hui)`;
    return "Coût : 200 DA (Limite gratuite atteinte)";
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/search" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition">
          <ChevronLeft size={16} className="mr-2" /> Retour aux résultats
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
              <img src="https://picsum.photos/seed/room1/800/600" alt="Intérieur" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm">
              <img src="https://picsum.photos/seed/room2/800/600" alt="Cuisine" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm relative group cursor-pointer">
              <img src="https://picsum.photos/seed/room3/800/600" alt="Salle de bain" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition flex items-center justify-center text-white text-lg font-bold">
                +8 Photos
              </div>
            </div>
            <div className="hidden md:block overflow-hidden rounded-[2rem] shadow-sm">
              <img src="https://picsum.photos/seed/exterior/800/600" alt="Extérieur" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
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
                      {property.transaction === 'buy' ? 'À vendre' : 'À louer'}
                    </span>
                    <span className="inline-block bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg border border-slate-100">
                      ID: #{property.id}420
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{property.title}</h1>
                  <div className="flex items-center text-slate-500 font-medium">
                    <MapPin size={20} className="mr-2 text-blue-600" />
                    {property.city}, {property.wilaya}
                  </div>
                </div>
                <div className="md:text-right bg-blue-50/50 p-6 rounded-[2rem] border border-blue-50">
                  <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Prix de l'immobilier</p>
                  <p className="text-4xl font-black text-blue-600">
                    {property.price.toLocaleString('fr-DZ')} <span className="text-xl font-bold">DA</span>
                  </p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-y border-slate-50 my-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Building size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                  <span className="font-bold text-slate-800">{PROPERTY_TYPES.find(t => t.value === property.type)?.label}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Ruler size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Surface</span>
                  <span className="font-bold text-slate-800">{property.surface} m²</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Calendar size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pièces</span>
                  <span className="font-bold text-slate-800">{property.rooms || '-'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
                    <Shield size={28} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Étage</span>
                  <span className="font-bold text-slate-800">{property.floor || '-'}</span>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 border-l-4 border-blue-600 pl-4">Description du bien</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 border border-slate-100 flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner overflow-hidden">
                    <img src={`https://picsum.photos/seed/${property.sellerName}/200/200`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-black text-xl text-slate-900">{property.sellerName}</h4>
                      {property.sellerType === 'agency' && (
                        <BadgeCheck size={20} className="text-blue-600 ml-2" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                      {property.sellerType === 'agency' ? 'Agence Immobilière' : 'Particulier'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg flex items-center mb-4 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={14} className="mr-2" /> {error}
                    </div>
                  )}

                  <button className="group w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center hover:bg-blue-700 transition shadow-xl shadow-blue-100">
                    <MessageSquare className="mr-3 group-hover:scale-110 transition" size={20} /> Envoyer un message
                  </button>
                  
                  {phoneState === 'hidden' ? (
                    <button 
                      onClick={handleUnlock}
                      className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex flex-col items-center justify-center hover:bg-black transition shadow-xl shadow-slate-200 active:scale-95"
                    >
                      <div className="flex items-center mb-0.5">
                        <Lock className="mr-3 text-blue-500" size={18} /> Débloquer le numéro
                      </div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest">{getUnlockMessage()}</span>
                    </button>
                  ) : phoneState === 'unlocking' ? (
                    <div className="w-full py-5 bg-slate-100 text-slate-400 font-bold rounded-2xl flex items-center justify-center animate-pulse">
                      Déblocage en cours...
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-100 text-center animate-in zoom-in-95">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.3em] mb-2 flex items-center justify-center">
                        <CheckCircle2 size={12} className="mr-1" /> Contact débloqué
                      </p>
                      <a href="tel:0550123456" className="text-2xl font-black text-slate-900 hover:text-blue-600 transition">05 50 12 34 56</a>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center space-x-4 pt-6">
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-4 rounded-full transition-all duration-300 shadow-sm ${isFavorite ? 'bg-red-50 text-red-500 shadow-red-100 border border-red-100' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
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
