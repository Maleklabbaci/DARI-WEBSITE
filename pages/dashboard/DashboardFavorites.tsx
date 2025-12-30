
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PROPERTIES } from '../../constants';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { PropertyCard } from '../../components/PropertyCard';

export const DashboardFavorites: React.FC = () => {
  const { user } = useAuth();

  const favoriteProperties = MOCK_PROPERTIES.filter(p => user?.favorites?.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Mes favoris</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Retrouvez tous les biens que vous avez sauvegardés.</p>
          </div>

          {favoriteProperties.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 text-slate-200">
                <Heart size={48} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Aucun favori pour le moment</h3>
              <p className="text-slate-500 mb-12 max-w-sm font-medium leading-relaxed">Parcourez les annonces et cliquez sur le coeur pour les ajouter à votre liste de favoris.</p>
              <Link 
                to="/search" 
                className="inline-flex items-center bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-100 active:scale-95"
              >
                <Search size={18} className="mr-3" /> Explorer les annonces
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-500">
              {favoriteProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
