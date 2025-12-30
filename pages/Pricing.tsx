
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Crown, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Pricing: React.FC = () => {
  const { isAuthenticated, user, updateSubscription } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleChoose = (plan: 'free' | 'premium' | 'ultime') => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    if (user?.subscription === plan) {
      alert("Vous êtes déjà abonné à cette offre.");
      return;
    }

    setLoadingPlan(plan);
    // Simulate API validation / payment process
    setTimeout(() => {
      updateSubscription(plan);
      setLoadingPlan(null);
      alert(`Félicitations ! Vous avez activé l'abonnement ${plan.toUpperCase()}.`);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight uppercase">Offres et abonnements Dari</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">Choisissez l'offre qui correspond le mieux à vos besoins, particuliers ou professionnels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Free Tier */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
            {user?.subscription === 'free' && (
              <div className="absolute top-4 right-4 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">Actuel</div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Gratuit</h3>
              <p className="text-slate-500 text-sm">Pour commencer sereinement.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-black">0 DA</span>
                <span className="ml-1 text-slate-400">/mois</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start text-sm"><Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} /> Création de compte gratuite</li>
              <li className="flex items-start text-sm font-bold text-blue-600"><Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} /> 1 000 DA de solde offerts</li>
              <li className="flex items-start text-sm"><Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} /> Messagerie interne</li>
              <li className="flex items-start text-sm text-slate-400"><Check className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} /> Numéros limités</li>
            </ul>
            <button 
              onClick={() => handleChoose('free')}
              disabled={loadingPlan !== null || user?.subscription === 'free'}
              className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-xl text-center hover:bg-slate-200 transition active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'free' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'free' ? 'Plan Actif' : 'Démarrer gratuitement'}
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-blue-600 shadow-2xl relative flex flex-col scale-105 z-10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Populaire
            </div>
            {user?.subscription === 'premium' && (
              <div className="absolute top-4 right-4 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">Actuel</div>
            )}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="text-blue-600" size={20} />
                <h3 className="text-xl font-bold">Premium</h3>
              </div>
              <p className="text-slate-500 text-sm">Particuliers sérieux & agences.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-black text-blue-600">2 500 DA</span>
                <span className="ml-1 text-slate-400">/mois</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start text-sm font-bold"><Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} /> Numéros illimités</li>
              <li className="flex items-start text-sm"><Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} /> Plus d'annonces actives (jusqu'à 30)</li>
              <li className="flex items-start text-sm font-bold text-blue-600"><Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} /> 2 mises en avant incluses (7j)</li>
              <li className="flex items-start text-sm"><Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} /> Statistiques détaillées</li>
              <li className="flex items-start text-sm"><Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} /> Moins de publicité</li>
            </ul>
            <button 
              onClick={() => handleChoose('premium')}
              disabled={loadingPlan !== null || user?.subscription === 'premium'}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-center hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'premium' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'premium' ? 'Plan Actif' : "Choisir l'offre Premium"}
            </button>
          </div>

          {/* Ultime Tier */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col relative overflow-hidden group">
            <Crown className="absolute -right-4 -top-4 text-white/5 group-hover:scale-125 transition duration-500" size={150} />
            {user?.subscription === 'ultime' && (
              <div className="absolute top-4 right-4 text-white bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Actuel</div>
            )}
            <div className="mb-8 relative z-10">
              <h3 className="text-xl font-bold mb-2">Ultime</h3>
              <p className="text-slate-400 text-sm">Agences & gros vendeurs.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-black text-white">6 000 DA</span>
                <span className="ml-1 text-slate-500">/mois</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              <li className="flex items-start text-sm"><ShieldCheck className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={18} /> Tout le Premium</li>
              <li className="flex items-start text-sm font-black text-blue-300"><Check className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={18} /> 5 à 20 mises en avant offertes</li>
              <li className="flex items-start text-sm font-bold"><Check className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={18} /> Badge Agence Premium</li>
              <li className="flex items-start text-sm"><Check className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={18} /> Page vitrine personnalisée</li>
              <li className="flex items-start text-sm"><Check className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={18} /> Support prioritaire 7j/7</li>
            </ul>
            <button 
              onClick={() => handleChoose('ultime')}
              disabled={loadingPlan !== null || user?.subscription === 'ultime'}
              className="w-full py-4 bg-white text-slate-900 font-black rounded-xl text-center hover:bg-slate-50 transition relative z-10 shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {loadingPlan === 'ultime' ? <Loader2 className="animate-spin mx-auto" size={20} /> : user?.subscription === 'ultime' ? 'Plan Actif' : "Choisir l'offre Ultime"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
