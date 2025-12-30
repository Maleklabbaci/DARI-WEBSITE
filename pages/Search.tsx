
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search as SearchIcon, MapPin, Building, Ruler, ChevronRight, Heart } from 'lucide-react';
import { MOCK_PROPERTIES, WILAYAS, PROPERTY_TYPES } from '../constants';
import { Property } from '../types';

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
            <h1 className="text-2xl font-bold text-slate-900">
              {filteredProperties.length} {filteredProperties.length > 1 ? 'biens trouvés' : 'bien trouvé'}
              {filters.wilaya ? ` à ${filters.wilaya}` : " en Algérie"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Recherche immobilière intelligente</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Trier par :</span>
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center space-x-2 mb-6">
                <Filter size={18} className="text-blue-600" />
                <h3 className="font-bold">Affiner ma recherche</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Transaction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setFilters({...filters, transaction: 'buy'})}
                      className={`py-2 text-sm rounded-lg border transition ${filters.transaction === 'buy' ? 'bg-blue-600 border-blue-600 text-white font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}
                    >
                      Acheter
                    </button>
                    <button 
                      onClick={() => setFilters({...filters, transaction: 'rent'})}
                      className={`py-2 text-sm rounded-lg border transition ${filters.transaction === 'rent' ? 'bg-blue-600 border-blue-600 text-white font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}
                    >
                      Louer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Wilaya</label>
                  <select 
                    value={filters.wilaya}
                    onChange={e => setFilters({...filters, wilaya: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Toute l'Algérie</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Type de bien</label>
                  <select 
                    value={filters.type}
                    onChange={e => setFilters({...filters, type: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous les biens</option>
                    {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Budget (DA)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.priceMin}
                      onChange={e => setFilters({...filters, priceMin: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.priceMax}
                      onChange={e => setFilters({...filters, priceMax: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Surface (m²)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.surfaceMin}
                      onChange={e => setFilters({...filters, surfaceMin: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.surfaceMax}
                      onChange={e => setFilters({...filters, surfaceMax: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre de pièces</label>
                  <select 
                    value={filters.rooms}
                    onChange={e => setFilters({...filters, rooms: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Peu importe</option>
                    <option value="1">1 pièce (Studio)</option>
                    <option value="2">2 pièces</option>
                    <option value="3">3 pièces</option>
                    <option value="4">4 pièces</option>
                    <option value="5">5+ pièces</option>
                  </select>
                </div>

                <button 
                  onClick={() => setFilters({ wilaya: '', transaction: 'buy', type: 'all', priceMin: '', priceMax: '', surfaceMin: '', surfaceMax: '', rooms: 'all' })}
                  className="w-full py-3 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                  <SearchIcon size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Aucun bien ne correspond à vos critères</h3>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto">Modifiez vos filtres ou abonnez-vous aux alertes pour être prévenu dès qu'un nouveau bien correspondant est publié.</p>
                <button 
                  onClick={() => setFilters({ wilaya: '', transaction: 'buy', type: 'all', priceMin: '', priceMax: '', surfaceMin: '', surfaceMax: '', rooms: 'all' })}
                  className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.map(property => (
                  <Link 
                    key={property.id} 
                    to={`/property/${property.id}`}
                    className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm tracking-widest">
                          {property.transaction === 'buy' ? 'À vendre' : 'À louer'}
                        </span>
                        {property.sellerType === 'agency' && (
                          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm tracking-widest">
                            Pro
                          </span>
                        )}
                      </div>
                      <button className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 shadow-sm transition-colors group-hover:scale-110">
                        <Heart size={20} />
                      </button>
                      <div className="absolute bottom-4 left-4">
                         <span className="bg-slate-900/90 backdrop-blur-md text-white text-xl font-black px-4 py-2 rounded-xl shadow-xl">
                          {property.price.toLocaleString('fr-DZ')} {property.transaction === 'buy' ? 'DA' : 'DA/m'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 space-x-2">
                        <span className="bg-slate-50 px-2 py-1 rounded-md text-slate-500">{PROPERTY_TYPES.find(t => t.value === property.type)?.label}</span>
                        <span>•</span>
                        <div className="flex items-center"><MapPin size={12} className="mr-1 text-blue-600" /> {property.city}, {property.wilaya}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-6 line-clamp-2 text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">{property.title}</h3>
                      
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 text-xs font-bold text-slate-600">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center"><Building size={18} className="mr-2 text-slate-300" /> {property.rooms || '-'} pièces</div>
                          <div className="flex items-center"><Ruler size={18} className="mr-2 text-slate-300" /> {property.surface} m²</div>
                        </div>
                        <div className="text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
                          Consulter <ChevronRight size={18} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
