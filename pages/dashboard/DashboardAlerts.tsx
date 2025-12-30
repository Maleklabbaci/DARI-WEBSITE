
import React, { useState } from 'react';
/* Fix: Import Link from react-router-dom */
import { Link } from 'react-router-dom';
import { Bell, Plus, Trash2, MapPin, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { WILAYAS, PROPERTY_TYPES } from '../../constants';
import { PropertyType, TransactionType } from '../../types';

export const DashboardAlerts: React.FC = () => {
  const { user, addAlert, toggleAlert, removeAlert } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    wilaya: '',
    type: 'apartment' as PropertyType,
    transaction: 'buy' as TransactionType,
    priceMax: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert({
      ...formData,
      priceMax: formData.priceMax ? parseInt(formData.priceMax) : undefined
    });
    setShowForm(false);
    setFormData({ wilaya: '', type: 'apartment', transaction: 'buy', priceMax: '' });
  };

  const alerts = user?.alerts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Mes alertes</h1>
               <p className="text-sm font-medium text-slate-500 mt-1">Soyez prévenu dès qu'un bien correspondant à vos critères est publié.</p>
            </div>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95"
              >
                <Plus size={20} className="mr-3" /> Créer une alerte
              </button>
            )}
          </div>

          {showForm && (
            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-blue-50 shadow-2xl animate-in slide-in-from-top-4 duration-500">
              <h2 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight flex items-center">
                <Bell size={24} className="mr-3 text-blue-600" /> Nouvelle alerte
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['buy', 'rent'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, transaction: t as TransactionType })}
                        className={`py-3.5 rounded-xl border-2 transition-all font-bold text-xs uppercase ${formData.transaction === t ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-100 text-slate-400 hover:border-blue-100'}`}
                      >
                        {t === 'buy' ? 'Achat' : 'Location'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wilaya</label>
                  <select 
                    required
                    value={formData.wilaya}
                    onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  >
                    <option value="">Sélectionner une wilaya</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type de bien</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  >
                    {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Max (DA)</label>
                  <input 
                    type="number"
                    placeholder="Ex: 50.000.000"
                    value={formData.priceMax}
                    onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition"
                  />
                </div>
                <div className="md:col-span-2 flex items-center justify-end space-x-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-12 py-3.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95"
                  >
                    Enregistrer l'alerte
                  </button>
                </div>
              </form>
            </div>
          )}

          {alerts.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-slate-200">
                <Bell size={48} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Aucune alerte configurée</h3>
              <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium leading-relaxed">Soyez le premier sur les bonnes affaires. Configurez une alerte pour recevoir des notifications par email dès qu'un bien vous correspond.</p>
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-100 active:scale-95"
                >
                  Démarrer maintenant
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-blue-100 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${alert.isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-300'}`}>
                      <Bell size={24} className={alert.isActive ? 'animate-bounce' : ''} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {alert.transaction === 'buy' ? 'Achat' : 'Location'}
                        </span>
                        <h3 className="text-lg font-black text-slate-900">
                          {PROPERTY_TYPES.find(t => t.value === alert.type)?.label} à {alert.wilaya}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-6 text-slate-500">
                        <div className="flex items-center text-xs font-bold uppercase tracking-wide">
                          <MapPin size={14} className="mr-1.5 text-slate-300" /> {alert.wilaya}
                        </div>
                        {alert.priceMax && (
                          <div className="flex items-center text-xs font-bold uppercase tracking-wide">
                             Budget Max : <span className="ml-1.5 text-slate-900">{alert.priceMax.toLocaleString()} DA</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-auto">
                    <div className="flex items-center mr-4">
                       <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={alert.isActive}
                          onChange={() => toggleAlert(alert.id)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-slate-400 peer-checked:text-blue-600 transition-colors">
                          {alert.isActive ? 'Active' : 'Pause'}
                        </span>
                      </label>
                    </div>
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner backdrop-blur-md">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-1">Optimisez votre recherche</h4>
                      <p className="text-sm text-slate-400 font-medium">L'algorithme Dari analyse les nouvelles annonces 24h/24 pour vous.</p>
                    </div>
                  </div>
                  <Link 
                    to="/search" 
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-xl shadow-blue-900/40 active:scale-95 text-sm uppercase tracking-widest"
                  >
                    Explorer maintenant
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
