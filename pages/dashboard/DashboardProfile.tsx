
import React, { useState } from 'react';
import { Camera, CheckCircle, Globe, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [accountType, setAccountType] = useState<'individual' | 'agency'>(user?.type || 'individual');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    wilaya: 'Alger',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          {showSuccess && (
            <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl flex items-center animate-in fade-in zoom-in-95">
              <CheckCircle2 size={20} className="mr-3" />
              <span className="font-bold">Profil mis à jour !</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black uppercase tracking-tight">Mon profil</h1>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setAccountType('individual')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition ${accountType === 'individual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Particulier
              </button>
              <button 
                onClick={() => setAccountType('agency')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition ${accountType === 'agency' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Agence
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-12">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 mb-12">
                <div className="relative">
                  <div className="w-32 h-32 rounded-[2rem] bg-blue-600 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center text-white text-4xl font-black">
                    {formData.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 p-3 bg-slate-900 text-white rounded-2xl shadow-lg border-2 border-white hover:bg-black transition active:scale-90">
                    <Camera size={20} />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">{user.name}</h2>
                  <p className="text-slate-500 font-medium">Compte {accountType === 'individual' ? 'Particulier' : 'Professionnel'}</p>
                  <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    <CheckCircle size={14} className="mr-1.5" /> Compte vérifié
                  </div>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nom complet</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email</label>
                    <input type="email" className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-4 outline-none cursor-not-allowed text-slate-400 font-bold" defaultValue={user.email} disabled />
                  </div>
                </div>

                {accountType === 'agency' && (
                  <div className="pt-8 border-t border-slate-50 space-y-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center uppercase tracking-tight">
                      <Globe className="mr-3 text-blue-600" size={24} /> Informations de l'agence
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nom de l'agence</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" placeholder="Dari Immo EURL" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Site Web</label>
                        <input type="url" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition font-bold" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-xl disabled:opacity-50 active:scale-95"
                  >
                    {isUpdating ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                    Mettre à jour mon profil
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
