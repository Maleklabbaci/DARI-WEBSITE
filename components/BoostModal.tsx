
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Calendar, Wallet, Crown, CheckCircle2, Loader2, AlertCircle, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  onSuccess: () => void;
}

export const BoostModal: React.FC<BoostModalProps> = ({ isOpen, onClose, listingId, listingTitle, onSuccess }) => {
  const { user, stats, useBoost, updateBalance } = useAuth();
  const [duration, setDuration] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_PRICE = 500;
  const totalPrice = duration * BASE_PRICE;

  // Simulation de calcul de portée (Algorithm Dari Ads)
  // En prod, ceci viendrait d'un hook ou d'une API
  const calculateReach = (days: number) => {
    const basePerDay = 150; // Moyenne pour Alger/Appartement
    const min = Math.floor(basePerDay * days * 0.85);
    const max = Math.ceil(basePerDay * days * 1.15);
    return { min, max };
  };

  const reach = calculateReach(duration);

  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setError(null);

    setTimeout(() => {
      if (stats.boostsRemaining > 0) {
        useBoost();
        setIsProcessing(false);
        onSuccess();
        onClose();
        return;
      }

      if (user.balance < totalPrice) {
        setError("Solde insuffisant. Veuillez recharger votre compte.");
        setIsProcessing(false);
        return;
      }

      updateBalance(-totalPrice);
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-blue-600 p-10 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Booster mon annonce</h2>
          </div>
          <p className="text-blue-100 text-sm font-medium">Placez <span className="font-black text-white">"{listingTitle}"</span> en tête de liste.</p>
        </div>

        <div className="p-10 space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
              <Calendar className="mr-2" size={14} /> Durée de la mise en avant
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 7].map((d) => (
                <button 
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${duration === d ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-blue-200'}`}
                >
                  <p className="font-black text-lg">{d} jour{d > 1 ? 's' : ''}</p>
                  <p className="text-[10px] font-bold uppercase">{d * BASE_PRICE} DA</p>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Portée estimée</p>
                <p className="text-sm font-black text-blue-900">
                  {reach.min.toLocaleString()} – {reach.max.toLocaleString()} personnes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-blue-400">
                <Wallet size={18} className="mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Votre solde</span>
              </div>
              <span className="font-black">{user.balance.toLocaleString()} DA</span>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400">Budget total ({duration}j)</span>
                <span className="text-xl font-black text-white">{totalPrice.toLocaleString()} DA</span>
              </div>

              {stats.boostsRemaining > 0 ? (
                <div className="flex items-center justify-between p-4 bg-blue-600/20 rounded-xl border border-blue-500/30">
                  <div className="flex items-center">
                    <Crown className="text-blue-400 mr-3" size={20} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight">Utiliser 1 Boost inclus</p>
                      <p className="text-[10px] text-blue-300">Crédits restants : {stats.boostsRemaining}</p>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
              ) : null}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center animate-in shake">
              <AlertCircle size={16} className="mr-2" /> {error}
            </div>
          )}

          <button 
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 flex items-center justify-center uppercase tracking-widest text-sm"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <>Confirmer le boost (+{duration} jours)</>}
          </button>
        </div>
      </div>
    </div>
  );
};
