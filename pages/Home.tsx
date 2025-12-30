
import React, { useState } from 'react';
import { Search, MapPin, Building, Key, Map, CheckCircle, ArrowRight, Wallet, Store, Briefcase, UserPlus, SearchCheck, MessageCircle, Heart, Star, TrendingUp, PlusCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { WILAYAS, PROPERTY_TYPES } from '../constants';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState({ wilaya: '', type: 'all', transaction: 'buy' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?w=${search.wilaya}&t=${search.transaction}&p=${search.type}`);
  };

  const handleCreateListingClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Bienvenue sur Dari – Votre plateforme <br className="hidden md:block"/> immobilière en Algérie
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            Achetez, louez ou publiez vos appartements, maisons, commerces, bureaux et terrains partout en Algérie.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/search" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center">
              Découvrir les annonces <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link 
              to="/create-listing" 
              onClick={handleCreateListingClick}
              className="w-full sm:w-auto px-8 py-4 bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition flex items-center justify-center"
            >
              Déposer une annonce gratuitement
            </Link>
          </div>
          
          <div className="bg-blue-800/40 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-2 inline-flex items-center text-sm text-white">
            <Wallet className="mr-2" size={16} />
            Nouveau sur Dari ? <span className="font-bold ml-1 mr-1">1 000 DA offerts</span> à l'inscription pour tester les options payantes.
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="max-w-5xl mx-auto mt-16 transform translate-y-12">
          <form onSubmit={handleSearch} className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-100">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Localisation</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={search.wilaya}
                  onChange={e => setSearch({...search, wilaya: e.target.value})}
                >
                  <option value="">Ville ou wilaya</option>
                  {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Transaction</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 text-slate-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={search.transaction}
                  onChange={e => setSearch({...search, transaction: e.target.value})}
                >
                  <option value="buy">Acheter</option>
                  <option value="rent">Louer</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Bien</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-slate-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={search.type}
                  onChange={e => setSearch({...search, type: e.target.value})}
                >
                  <option value="all">Tous types de biens</option>
                  {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-3 flex items-center justify-center transition shadow-lg active:scale-95">
              <Search className="mr-2" size={20} /> Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-40 pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 text-slate-900 uppercase tracking-tight">Tous vos biens immobiliers au même endroit</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Dari rassemble particuliers et agences pour tous vos projets.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Logements', desc: 'Appartements, maisons, studios, villas, duplex…', icon: <Key />, color: 'bg-blue-600' },
              { title: 'Commerces & Activités', desc: 'Locaux commerciaux, boutiques, restaurants, cafés, entrepôts…', icon: <Store />, color: 'bg-green-600' },
              { title: 'Bureaux & Professionnel', desc: 'Plateaux de bureaux, espaces de coworking, cabinets…', icon: <Briefcase />, color: 'bg-purple-600' },
              { title: 'Terrains', desc: 'Terrains constructibles, agricoles, lots pour promotion immobilière…', icon: <Map />, color: 'bg-orange-600' }
            ].map((cat, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg group-hover:scale-110 transition duration-500`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-slate-900">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{cat.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-slate-400 font-medium italic">Que vous soyez acheteur, locataire, investisseur ou professionnel, Dari vous aide à trouver le bien qui vous correspond.</p>
        </div>
      </section>

      {/* How it Works - Dual Paths */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">Comment fonctionne Dari ?</h2>
             <p className="text-slate-500 font-medium">Une expérience simplifiée pour tous les acteurs de l'immobilier.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Path: Acheteurs */}
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-blue-600 uppercase tracking-widest mb-12 flex items-center">
                <SearchCheck className="mr-3" size={32} /> Pour les acheteurs & locataires
              </h3>
              <div className="space-y-12">
                {[
                  { title: "Étape 1 – Créez votre compte gratuitement", desc: "Inscrivez-vous en quelques secondes et recevez automatiquement 1 000 DA de solde de bienvenue.", icon: <UserPlus className="text-blue-500" /> },
                  { title: "Étape 2 – Recherchez votre bien", desc: "Filtrez par ville, type de bien, vente ou location, budget, surface, nombre de pièces, etc.", icon: <Search className="text-blue-500" /> },
                  { title: "Étape 3 – Contactez le vendeur", desc: "Envoyez des messages via la messagerie Dari ou débloquez les numéros de téléphone grâce à votre solde ou avec un abonnement.", icon: <MessageCircle className="text-blue-500" /> },
                  { title: "Étape 4 – Sauvegardez vos favoris", desc: "Gardez une trace des biens qui vous intéressent et soyez alerté dès qu’un bien similaire est publié.", icon: <Heart className="text-blue-500" /> }
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Path: Vendeurs */}
            <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl text-white">
              <h3 className="text-2xl font-black text-blue-400 uppercase tracking-widest mb-12 flex items-center">
                <Store className="mr-3" size={32} /> Pour les vendeurs & agences
              </h3>
              <div className="space-y-12">
                {[
                  { title: "Étape 1 – Créez votre compte vendeur", desc: "Particulier ou professionnel, complétez votre profil en quelques clics.", icon: <UserPlus className="text-blue-400" /> },
                  { title: "Étape 2 – Publiez vos annonces", desc: "Ajoutez vos appartements, maisons, commerces, bureaux ou terrains avec photos, description, prix et localisation.", icon: <PlusCircle className="text-blue-400" /> },
                  { title: "Étape 3 – Boostez votre visibilité", desc: "Utilisez votre solde pour mettre vos annonces en avant et toucher plus de visiteurs.", icon: <TrendingUp className="text-blue-400" /> },
                  { title: "Étape 4 – Gérez vos contacts", desc: "Recevez des messages et des appels directement. Suivez vos statistiques (vues, contacts, numéros affichés).", icon: <Star className="text-blue-400" /> }
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-black mb-2">{step.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/signup" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-200 inline-block active:scale-95">
              Créer mon compte
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center bg-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Prêt à commencer avec Dari ?</h2>
            <p className="text-slate-500 text-xl mb-12 font-medium leading-relaxed">Créez votre compte, recevez 1 000 DA de solde offerts et découvrez une nouvelle façon de gérer l'immobilier en Algérie.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               {!isAuthenticated ? (
                 <>
                   <Link to="/signup" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95">S'inscrire</Link>
                   <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition shadow-sm active:scale-95">Se connecter</Link>
                 </>
               ) : (
                 <Link to="/create-listing" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95">Publier une annonce</Link>
               )}
            </div>
         </div>
      </section>
    </div>
  );
};
