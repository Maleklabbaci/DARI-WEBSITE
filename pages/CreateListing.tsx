
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Building, Info, CheckCircle, Sparkles, Loader2, Warehouse, Map, Briefcase, Store, CheckCircle2, TrendingUp, Wallet } from 'lucide-react';
import { WILAYAS, PROPERTY_TYPES } from '../constants';
import { generateDescription } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';

export const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    transaction: 'buy',
    price: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    hasElevator: false,
    hasParking: false,
    heatingType: 'Gaz',
    commercialSurface: '',
    recommendedActivity: '',
    hasVitrine: false,
    zone: 'Rue passante',
    nbOffices: '',
    hasMeetingRoom: false,
    hasFiber: false,
    isConstructible: false,
    isViabilized: false,
    landType: 'Constructible',
    wilaya: '',
    city: '',
    neighborhood: '',
    address: '',
    hideAddress: false,
    features: [] as string[]
  });

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.wilaya) return alert("Veuillez d'abord remplir le titre et la wilaya.");
    setIsGenerating(true);
    const text = await generateDescription({
      type: formData.type,
      rooms: formData.rooms,
      surface: formData.surface,
      location: `${formData.city}, ${formData.wilaya}`,
      features: formData.features
    });
    setFormData({ ...formData, description: text || formData.description });
    setIsGenerating(false);
  };

  const handlePublish = () => {
    if (!user) return;
    const BOOST_COST = 500;

    if (isBoosting && user.balance < BOOST_COST) {
      alert("Votre solde est insuffisant pour booster cette annonce. Veuillez la publier sans boost ou recharger votre solde.");
      return;
    }

    setIsPublishing(true);
    
    // Simulate API Call
    setTimeout(() => {
      if (isBoosting) {
        updateBalance(-BOOST_COST);
      }
      setIsPublishing(false);
      navigate('/dashboard/ads');
    }, 1500);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'apartment':
      case 'house':
      case 'studio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-slate-50 rounded-3xl animate-in fade-in slide-in-from-top-4">
            <h3 className="col-span-full font-black text-slate-900 text-sm uppercase tracking-widest mb-2 flex items-center">
              <Building className="mr-2 text-blue-600" size={16} /> Caractéristiques Logement
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Nombre de chambres</label>
              <input 
                type="number" 
                min="0" 
                max="50" 
                placeholder="Ex: 2" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                value={formData.bedrooms} 
                onChange={e => setFormData({...formData, bedrooms: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Nombre de SDB</label>
              <input 
                type="number" 
                min="0" 
                max="20" 
                placeholder="Ex: 1" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                value={formData.bathrooms} 
                onChange={e => setFormData({...formData, bathrooms: e.target.value})} 
              />
            </div>
            {formData.type !== 'house' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Étage</label>
                <input 
                  type="number" 
                  min="0" 
                  max="150" 
                  placeholder="Ex: 3" 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                  value={formData.floor} 
                  onChange={e => setFormData({...formData, floor: e.target.value})} 
                />
              </div>
            )}
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Type de chauffage</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.heatingType} onChange={e => setFormData({...formData, heatingType: e.target.value})}>
                  <option>Gaz</option>
                  <option>Électrique</option>
                  <option>Central</option>
                </select>
              </div>
            <div className="flex flex-wrap gap-6 mt-4 col-span-full">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600 border-slate-300 focus:ring-blue-500" checked={formData.hasElevator} onChange={e => setFormData({...formData, hasElevator: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition">Ascenseur</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600 border-slate-300 focus:ring-blue-500" checked={formData.hasParking} onChange={e => setFormData({...formData, hasParking: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition">Parking / Garage</span>
              </label>
            </div>
          </div>
        );
      case 'commercial':
      case 'warehouse':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-slate-50 rounded-3xl animate-in fade-in slide-in-from-top-4">
            <h3 className="col-span-full font-black text-slate-900 text-sm uppercase tracking-widest mb-2 flex items-center">
              <Store className="mr-2 text-green-600" size={16} /> Caractéristiques Commerce
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Surface commerciale (m²)</label>
              <input 
                type="number" 
                min="1" 
                max="50000" 
                placeholder="Ex: 120" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-50 transition" 
                value={formData.commercialSurface} 
                onChange={e => setFormData({...formData, commercialSurface: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Type d'activité recommandé</label>
              <input type="text" placeholder="Ex: Boutique, café, restaurant..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.recommendedActivity} onChange={e => setFormData({...formData, recommendedActivity: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Zone</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})}>
                <option>Rue passante</option>
                <option>Centre commercial</option>
                <option>Zone industrielle</option>
              </select>
            </div>
            <label className="flex items-center space-x-3 cursor-pointer group col-span-full mt-4">
              <input type="checkbox" className="w-5 h-5 rounded text-green-600 border-slate-300 focus:green-500" checked={formData.hasVitrine} onChange={e => setFormData({...formData, hasVitrine: e.target.checked})} />
              <span className="text-sm font-bold text-slate-700 group-hover:text-green-600 transition">Vitrine</span>
            </label>
          </div>
        );
      case 'office':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-slate-50 rounded-3xl animate-in fade-in slide-in-from-top-4">
            <h3 className="col-span-full font-black text-slate-900 text-sm uppercase tracking-widest mb-2 flex items-center">
              <Briefcase className="mr-2 text-purple-600" size={16} /> Caractéristiques Bureau
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Bureaux fermés (nombre)</label>
              <input 
                type="number" 
                min="1" 
                max="200" 
                placeholder="Ex: 4" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-50 transition" 
                value={formData.nbOffices} 
                onChange={e => setFormData({...formData, nbOffices: e.target.value})} 
              />
            </div>
            <div className="flex flex-wrap gap-6 mt-4 col-span-full">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-purple-600 border-slate-300 focus:ring-purple-500" checked={formData.hasMeetingRoom} onChange={e => setFormData({...formData, hasMeetingRoom: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-purple-600 transition">Salles de réunion</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-purple-600 border-slate-300 focus:ring-purple-500" checked={formData.hasFiber} onChange={e => setFormData({...formData, hasFiber: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-purple-600 transition">Fibre / Internet haut débit</span>
              </label>
            </div>
          </div>
        );
      case 'land':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-slate-50 rounded-3xl animate-in fade-in slide-in-from-top-4">
            <h3 className="col-span-full font-black text-slate-900 text-sm uppercase tracking-widest mb-2 flex items-center">
              <Map className="mr-2 text-orange-600" size={16} /> Caractéristiques Terrain
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Type de terrain</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.landType} onChange={e => setFormData({...formData, landType: e.target.value})}>
                <option>Constructible</option>
                <option>Agricole</option>
                <option>Industriel</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 col-span-full">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-orange-600 border-slate-300 focus:ring-orange-500" checked={formData.isConstructible} onChange={e => setFormData({...formData, isConstructible: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition">Terrain constructible</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded text-orange-600 border-slate-300 focus:ring-orange-500" checked={formData.isViabilized} onChange={e => setFormData({...formData, isViabilized: e.target.checked})} />
                <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition">Terrain viabilisé</span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-black mb-4 text-slate-900 uppercase tracking-tight">Déposer une annonce immobilière</h1>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`h-2 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Étape {step} sur 5</p>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {step === 1 ? 'Général' : step === 2 ? 'Localisation' : step === 3 ? 'Détails' : step === 4 ? 'Photos' : 'Validation'}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden p-8 md:p-16">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900">
              <Info className="mr-4 text-blue-600" size={32} /> Type d'annonce
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Transaction</label>
                <div className="grid grid-cols-2 gap-3">
                  {['buy', 'rent'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({...formData, transaction: t as any})}
                      className={`py-5 rounded-2xl border-2 transition-all duration-300 font-black text-sm uppercase ${formData.transaction === t ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100' : 'border-slate-100 hover:border-blue-200 text-slate-400'}`}
                    >
                      {t === 'buy' ? 'Vente' : 'Location'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Type de bien</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                >
                  {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-3 mb-10">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Titre de l'annonce</label>
              <input 
                type="text" 
                placeholder="Ex: F3 à Bab Ezzouar, 90 m², rénové"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900">
              <MapPin className="mr-4 text-blue-600" size={32} /> Localisation du bien
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Wilaya</label>
                <select 
                  value={formData.wilaya}
                  onChange={e => setFormData({...formData, wilaya: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                >
                  <option value="">Ex. Alger</option>
                  {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ville / Commune</label>
                <input 
                  type="text" 
                  placeholder="Ex. Bab Ezzouar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
               <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Quartier (optionnel)</label>
                <input 
                  type="text" 
                  placeholder="Ex. Cité Universitaire"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                  value={formData.neighborhood}
                  onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                />
              </div>
               <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Adresse précise (optionnel)</label>
                <input 
                  type="text" 
                  placeholder="Ex. Rue 12, Immeuble B..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
            <label className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer group hover:bg-white hover:border-blue-100 transition">
               <input 
                type="checkbox" 
                className="w-6 h-6 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                checked={formData.hideAddress}
                onChange={e => setFormData({...formData, hideAddress: e.target.checked})}
               />
               <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition">Masquer l'adresse exacte et afficher seulement la ville / wilaya</span>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900">
              <Building className="mr-4 text-blue-600" size={32} /> Détails techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Prix (DA)</label>
                <input 
                  type="number" 
                  min="0"
                  max="1000000000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  placeholder="Ex: 75 000 000" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Surface (m²)</label>
                <input 
                  type="number" 
                  min="1"
                  max="1000000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                  value={formData.surface} 
                  onChange={e => setFormData({...formData, surface: e.target.value})} 
                  placeholder="Ex: 90" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nombre de pièces</label>
                <input 
                  type="number" 
                  min="1"
                  max="50"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-50 transition" 
                  value={formData.rooms} 
                  onChange={e => setFormData({...formData, rooms: e.target.value})} 
                  placeholder="Ex: 3" 
                />
              </div>
            </div>

            {renderTypeSpecificFields()}
            
            <div className="space-y-4 mt-12">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description détaillée</label>
                <button 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="flex items-center text-xs font-black text-blue-600 hover:text-blue-800 disabled:opacity-50 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                >
                  {isGenerating ? <Loader2 className="animate-spin mr-2" size={16} /> : <Sparkles className="mr-2" size={16} />}
                  Aide-moi à écrire (IA)
                </button>
              </div>
              <textarea 
                rows={8}
                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-8 font-medium text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition leading-relaxed"
                placeholder="Décrivez le bien, l’état général, la vue, la proximité des transports, écoles, commerces…"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
             <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900">
              <Camera className="mr-4 text-blue-600" size={32} /> Photos du bien
            </h2>
            <div className="border-8 border-dashed border-slate-50 rounded-[3rem] p-24 text-center hover:border-blue-50 hover:bg-slate-50/30 transition-all cursor-pointer group relative overflow-hidden">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition duration-500 relative z-10">
                <Camera size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-black mb-4 relative z-10 text-slate-900">Ajouter des photos</h3>
              <p className="text-slate-400 max-w-sm mx-auto font-medium text-sm leading-relaxed relative z-10">Ajoutez des photos claires de l’intérieur, de l’extérieur et de la façade. Minimum 1 photo pour garantir la qualité de votre annonce.</p>
              <input type="file" multiple className="hidden" id="fileInput" />
              <label htmlFor="fileInput" className="mt-12 inline-block bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm hover:bg-black transition cursor-pointer shadow-2xl relative z-10 active:scale-95">
                Parcourir mes fichiers
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in slide-in-from-right-8 duration-500 text-center py-12">
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600 shadow-inner">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">C'est presque fini !</h2>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed">Votre annonce a été pré-enregistrée. Vous pouvez maintenant choisir de la booster pour attirer plus de visiteurs.</p>
            
            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-blue-50 inline-block mb-12 text-left w-full max-w-md shadow-2xl shadow-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 -translate-y-1/2 translate-x-1/2 rounded-full opacity-50"></div>
              
              <label className="flex items-center justify-between mb-8 cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 group-hover:text-blue-600 transition">Mise en avant (7j)</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visibilité boostée x5</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-black text-blue-600 text-lg">500 DA</span>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded text-blue-600 border-slate-200" 
                    checked={isBoosting}
                    onChange={(e) => setIsBoosting(e.target.checked)}
                  />
                </div>
              </label>
              
              <div className="flex items-center justify-between px-4 pt-8 border-t border-slate-100">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total à déduire</span>
                <span className="text-3xl font-black text-slate-900">{isBoosting ? '500' : '0'} <span className="text-sm text-slate-400">DA</span></span>
              </div>
              <div className="mt-8 p-4 bg-slate-50 rounded-xl flex items-center justify-center space-x-2">
                 <Wallet size={16} className="text-slate-400" />
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Solde actuel : <span className="text-blue-600 font-black">{user?.balance?.toLocaleString()} DA</span></span>
              </div>
            </div>
            
            <p className="text-xs font-bold text-slate-400 max-w-sm mx-auto italic leading-relaxed">
              Votre annonce pourra être contrôlée par l’équipe Dari avant mise en ligne pour garantir la qualité et la sécurité.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-16 pt-10 border-t border-slate-50">
          {step > 1 ? (
            <button onClick={prevStep} className="px-10 py-5 font-black text-slate-400 hover:text-blue-600 transition-all active:scale-95" disabled={isPublishing}>
              Retour
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 5 ? (
            <button onClick={nextStep} className="px-14 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-100 active:scale-95">
              Étape suivante
            </button>
          ) : (
            <button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="px-16 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-200 active:scale-95 flex items-center"
            >
              {isPublishing ? <Loader2 size={20} className="animate-spin mr-2" /> : null}
              Publier l'annonce
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
