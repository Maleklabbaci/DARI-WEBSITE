
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Building, Ruler, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { PROPERTY_TYPES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = "" }) => {
  const { toggleFavorite, isFavorite, isAuthenticated } = useAuth();
  const { language, t } = useLanguage();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    toggleFavorite(property.id);
  };

  const favoriteStatus = isFavorite(property.id);

  return (
    <div className={`bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col ${className}`}>
      <Link to={`/property/${property.id}`} className="block relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
        />
        <div className="absolute top-4 start-4 flex flex-wrap gap-2">
          <span className="bg-white/95 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl shadow-sm tracking-widest">
            {property.transaction === 'buy' ? t('header.buy') : t('header.rent')}
          </span>
          {property.isBoosted && (
            <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-xl shadow-sm tracking-widest animate-pulse">
              {t('dashboard.status.active')}
            </span>
          )}
        </div>
        
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-4 end-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            favoriteStatus 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart size={20} fill={favoriteStatus ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-4 start-4">
          <div className="bg-slate-900/90 backdrop-blur-xl text-white px-5 py-2.5 rounded-[1.25rem] shadow-2xl border border-white/10">
            <span className="text-xl font-black">{property.price.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-DZ')}</span>
            <span className="text-sm font-bold ms-1">{t('common.da')}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-8 flex-grow flex flex-col text-start">
        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 gap-2">
          <span className="bg-slate-50 px-2.5 py-1 rounded-lg text-slate-500 border border-slate-100">
            {PROPERTY_TYPES.find(t => t.value === property.type)?.label}
          </span>
          <span>•</span>
          <div className="flex items-center">
            <MapPin size={12} className="me-1.5 text-blue-600" />
            <span className="truncate">{property.city}, {property.wilaya}</span>
          </div>
        </div>
        
        <Link to={`/property/${property.id}`} className="block group/title mb-6">
          <h3 className="text-xl font-black text-slate-800 group-hover/title:text-blue-600 transition-colors leading-tight line-clamp-2">
            {property.title}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-5 text-slate-500">
            <div className="flex items-center font-bold text-xs">
              <Building size={16} className="me-2 text-slate-300" />
              {property.rooms || '-'} <span className="ms-1">{t('common.roomsUnit')}</span>
            </div>
            <div className="flex items-center font-bold text-xs">
              <Ruler size={16} className="me-2 text-slate-300" />
              {property.surface} <span className="text-[10px] ms-1 uppercase">m²</span>
            </div>
          </div>
          <Link 
            to={`/property/${property.id}`} 
            className="w-10 h-10 bg-slate-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
          >
            <ChevronRight size={20} className="rtl:rotate-180 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
