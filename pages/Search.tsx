
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search as SearchIcon } from 'lucide-react';
import { MOCK_PROPERTIES, WILAYAS, PROPERTY_TYPES } from '../constants';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(MOCK_PROPERTIES);
  
  // Detailed filter state
  const [filters, setFilters] = useState({
    wilaya: searchParams.get('w') || '',
    transaction: searchParams.get('t') || 'buy',
    type: searchParams.get('p') || 'all',
    priceMin: '',
    priceMax: '',
    surfaceMin: '',
    surfaceMax: '',
    rooms: 'all'
  });

  useEffect(() => {
    let result = MOCK_PROPERTIES;
    if (filters.wilaya) result = result.filter(p => p.wilaya === filters.wilaya);
    if (filters.transaction !== 'all') result = result.filter(p => p.transaction === filters.transaction);
    if (filters.type !== 'all') result = result.filter(p => p.type === filters.type);
    
    if (filters.priceMin) result = result.filter(p => p.price >= parseInt(filters.priceMin));
    if (filters.priceMax) result = result.filter(p => p.price <= parseInt(filters.priceMax));
    if (filters.surfaceMin) result = result.filter(p => p.surface >= parseInt(filters.surfaceMin));
    if (filters.surfaceMax) result = result.filter(p => p.surface <= parseInt(filters.surfaceMax));
    if (filters.rooms !== 'all') result = result.filter(p => p.rooms === parseInt(filters.rooms));

    setFilteredProperties(result);
  }, [filters]);

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {filteredProperties.length} {filteredProperties.length > 1 ? 'biens trouvés' : 'bien trouvé'}
              {filters.wilaya ? ` à ${filters.wilaya}` : " en Algérie"}
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Recherche immobilière intelligente</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trier par :</span>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-50 shadow-sm transition">
              <option>Plus récents</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Surface</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-50">
                <Filter size={18} className="text-blue-600" />
                <h3 className="font-black uppercase text-sm tracking-tight">Filtres</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Transaction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setFilters({...filters, transaction: 'buy'})}
                      className={`py-3 text-xs rounded-xl border-2 transition-all duration-300 font-black uppercase ${filters.transaction === 'buy' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-50' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-100'}`}
                    >
                      Acheter
                    </button>
                    <button 
                      onClick={() => setFilters({...filters, transaction: 'rent'})}
                      className={`py-3 text-xs rounded-xl border-2 transition-all duration-300 font-black uppercase ${filters.transaction === 'rent' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-50' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-100'}`}
                    >
                      Louer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Wilaya</label>
                  <select 
                    value={filters.wilaya}
                    onChange={e => setFilters({...filters, wilaya: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  >
                    <option value="">Toute l'Algérie</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Type de bien</label>
                  <select 
                    value={filters.type}
                    onChange={e => setFilters({...filters, type: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  >
                    <option value="all">Tous les biens</option>
                    {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Budget (DA)</label>
                  <div className="space-y-2">
                    <input 
                      type="number" 
                      placeholder="Prix Min" 
                      value={filters.priceMin}
                      onChange={e => setFilters({...filters, priceMin: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition" 
                    />
                    <input 
                      type="number" 
                      placeholder="Prix Max" 
                      value={filters.priceMax}
                      onChange={e => setFilters({...filters, priceMax: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Surface (m²)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.surfaceMin}
                      onChange={e => setFilters({...filters, surfaceMin: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-50 transition" 
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.surfaceMax}
                      onChange={e => setFilters({...filters, surfaceMax: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-50 transition" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pièces</label>
                  <select 
                    value={filters.rooms}
                    onChange={e => setFilters({...filters, rooms: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  >
                    <option value="all">Peu importe</option>
                    <option value="1">1 pièce</option>
                    <option value="2">2 pièces</option>
                    <option value="3">3 pièces</option>
                    <option value="4">4 pièces</option>
                    <option value="5">5+ pièces</option>
                  </select>
                </div>

                <button 
                  onClick={() => setFilters({ wilaya: '', transaction: 'buy', type: 'all', priceMin: '', priceMax: '', surfaceMin: '', surfaceMax: '', rooms: 'all' })}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 text-slate-200">
                  <SearchIcon size={48} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 uppercase tracking-tight">Aucun résultat</h3>
                <p className="text-slate-500 mb-12 max-w-sm font-medium leading-relaxed">Nous n'avons trouvé aucun bien correspondant à vos critères actuels. Essayez d'élargir votre recherche.</p>
                <button 
                  onClick={() => setFilters({ wilaya: '', transaction: 'buy', type: 'all', priceMin: '', priceMax: '', surfaceMin: '', surfaceMax: '', rooms: 'all' })}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-100"
                >
                  Effacer tous les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
