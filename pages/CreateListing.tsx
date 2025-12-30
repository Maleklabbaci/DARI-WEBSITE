
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Building, Info, CheckCircle, Sparkles, Loader2, Warehouse, Map, Briefcase, Store, CheckCircle2, TrendingUp, Wallet } from 'lucide-react';
import { WILAYAS, PROPERTY_TYPES } from '../constants';
import { generateDescription } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();
  const { t, language } = useLanguage();
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
    if (!formData.title || !formData.wilaya) return;
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
      return;
    }

    setIsPublishing(true);
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-start">
      <div className="mb-12">
        <h1 className="text-3xl font-black mb-4 text-slate-900 uppercase tracking-tight">{t('create.title')}</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`h-2 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t('create.step').replace('{n}', step.toString())}</p>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
            {step === 1 ? t('create.step1') : step === 2 ? t('create.step2') : step === 3 ? t('create.step3') : step === 4 ? t('create.step4') : t('create.step5')}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden p-8 md:p-16">
        {step === 1 && (
          <div className="animate-in slide-in-from-end-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900 gap-4">
              <Info className="text-blue-600 flex-shrink-0" size={32} /> {t('create.step1')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('create.transaction')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {['buy', 'rent'].map(t_key => (
                    <button 
                      key={t_key}
                      onClick={() => setFormData({...formData, transaction: t_key as any})}
                      className={`py-5 rounded-2xl border-2 transition-all duration-300 font-black text-sm uppercase ${formData.transaction === t_key ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg' : 'border-slate-100 text-slate-400'}`}
                    >
                      {t_key === 'buy' ? t('header.buy') : t('header.rent')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('create.propertyType')}</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                >
                  {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-3 mb-10">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('create.adTitle')}</label>
              <input 
                type="text" 
                placeholder={t('create.titlePlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none transition"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-end-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900 gap-4">
              <MapPin className="text-blue-600 flex-shrink-0" size={32} /> {t('create.step2')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('common.wilaya')}</label>
                <select 
                  value={formData.wilaya}
                  onChange={e => setFormData({...formData, wilaya: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none transition"
                >
                  <option value="">--</option>
                  {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('common.city')}</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none transition"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>
            <label className="flex items-center space-x-4 rtl:space-x-reverse p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer group hover:bg-white hover:border-blue-100 transition">
               <input 
                type="checkbox" 
                className="w-6 h-6 rounded text-blue-600 border-slate-300"
                checked={formData.hideAddress}
                onChange={e => setFormData({...formData, hideAddress: e.target.checked})}
               />
               <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition">{t('create.hideAddress')}</span>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-end-8 duration-500">
            <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900 gap-4">
              <Building className="text-blue-600 flex-shrink-0" size={32} /> {t('create.step3')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('common.price')} ({t('common.da')})</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none transition" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('common.surface')} (m²)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none transition" 
                  value={formData.surface} 
                  onChange={e => setFormData({...formData, surface: e.target.value})} 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('common.rooms')}</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 outline-none transition" 
                  value={formData.rooms} 
                  onChange={e => setFormData({...formData, rooms: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('create.descLabel')}</label>
                <button 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 disabled:opacity-50 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                  {t('create.aiHelp')}
                </button>
              </div>
              <textarea 
                rows={8}
                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-8 font-medium text-slate-700 outline-none transition leading-relaxed"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-end-8 duration-500">
             <h2 className="text-2xl font-black mb-10 flex items-center text-slate-900 gap-4">
              <Camera className="text-blue-600 flex-shrink-0" size={32} /> {t('create.step4')}
            </h2>
            <div className="border-8 border-dashed border-slate-50 rounded-[3rem] p-24 text-center hover:bg-slate-50/30 transition-all cursor-pointer group relative overflow-hidden">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition duration-500 relative z-10">
                <Camera size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-black mb-4 relative z-10 text-slate-900">{t('create.addPhotos')}</h3>
              <p className="text-slate-400 max-w-sm mx-auto font-medium text-sm leading-relaxed relative z-10">{t('create.photosDesc')}</p>
              <input type="file" multiple className="hidden" id="fileInput" />
              <label htmlFor="fileInput" className="mt-12 inline-block bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm hover:bg-black transition cursor-pointer shadow-2xl relative z-10 active:scale-95">
                {language === 'ar' ? 'اختر ملفات' : language === 'en' ? 'Browse files' : 'Parcourir les fichiers'}
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in slide-in-from-end-8 duration-500 text-center py-12">
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600 shadow-inner">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">{t('create.finish')}</h2>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed">{t('create.finishDesc')}</p>
            
            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-blue-50 inline-block mb-12 text-start w-full max-w-md shadow-2xl relative overflow-hidden">
              <label className="flex items-center justify-between mb-8 cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 group-hover:text-blue-600 transition">{t('create.boostOption')}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('create.boostDesc')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-blue-600 text-lg">500 {t('common.da')}</span>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded text-blue-600" 
                    checked={isBoosting}
                    onChange={(e) => setIsBoosting(e.target.checked)}
                  />
                </div>
              </label>
              
              <div className="flex items-center justify-between px-4 pt-8 border-t border-slate-100">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{language === 'ar' ? 'المجموع' : 'Total'}</span>
                <span className="text-3xl font-black text-slate-900">{isBoosting ? '500' : '0'} <span className="text-sm text-slate-400">{t('common.da')}</span></span>
              </div>
              <div className="mt-8 p-4 bg-slate-50 rounded-xl flex items-center justify-center gap-2">
                 <Wallet size={16} className="text-slate-400" />
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.balance')} : <span className="text-blue-600 font-black">{user?.balance?.toLocaleString()} {t('common.da')}</span></span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-16 pt-10 border-t border-slate-50">
          {step > 1 ? (
            <button onClick={prevStep} className="px-10 py-5 font-black text-slate-400 hover:text-blue-600 transition-all active:scale-95" disabled={isPublishing}>
              {t('common.back')}
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 5 ? (
            <button onClick={nextStep} className="px-14 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-100 active:scale-95">
              {t('common.next')}
            </button>
          ) : (
            <button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="px-16 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-200 active:scale-95 flex items-center gap-2"
            >
              {isPublishing ? <Loader2 className="animate-spin" size={20} /> : null}
              {t('create.publish')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
