
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, PlusCircle, Eye, Rocket, Pause, Play, Trash2, Edit3, MapPin, AlertCircle, CheckCircle2, BarChart3, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BoostModal } from '../../components/BoostModal';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardAds: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any>(null);

  const [ads, setAds] = useState([
    { 
      id: '1', 
      title: 'Appartement F3 Bab Ezzouar', 
      price: '15.000.000 DA', 
      status: 'active', 
      views: 245, 
      contacts: 12, 
      type: 'Vente', 
      propType: 'Appartement',
      city: 'Bab Ezzouar',
      wilaya: 'Alger',
      created: '12/03/2024',
      isBoosted: false
    },
    { 
      id: '2', 
      title: 'Studio Centre Oran', 
      price: '45.000 DA', 
      status: 'paused', 
      views: 12, 
      contacts: 0, 
      type: 'Location', 
      propType: 'Studio',
      city: 'Centre',
      wilaya: 'Oran',
      created: '20/03/2024',
      isBoosted: false
    }
  ]);

  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const openBoostModal = (ad: any) => {
    setSelectedAd(ad);
    setIsBoostModalOpen(true);
  };

  const handleBoostSuccess = () => {
    setAds(ads.map(ad => ad.id === selectedAd.id ? { ...ad, isBoosted: true } : ad));
    setMessage({ text: t('common.success'), type: 'success' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setAds(ads.map(ad => {
      if (ad.id === id) {
        return { ...ad, status: ad.status === 'active' ? 'paused' : 'active' };
      }
      return ad;
    }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('common.delete') + " ?")) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start">
      <BoostModal 
        isOpen={isBoostModalOpen}
        onClose={() => setIsBoostModalOpen(false)}
        listingId={selectedAd?.id}
        listingTitle={selectedAd?.title}
        onSuccess={handleBoostSuccess}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          {message && (
            <div className={`p-4 rounded-2xl flex items-center animate-in fade-in zoom-in-95 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message.type === 'success' ? <CheckCircle2 size={20} className="me-3" /> : <AlertCircle size={20} className="me-3" />}
              <span className="font-bold text-sm">{message.text}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{t('dashboard.menu.ads')}</h1>
               <p className="text-sm font-medium text-slate-500 mt-1">{t('dashboard.manageAds')}</p>
            </div>
            <Link to="/create-listing" className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95">
              <PlusCircle size={20} className="me-3" /> {t('dashboard.postAd')}
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">{t('dashboard.table.item')}</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">{t('dashboard.table.typePrice')}</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">{t('dashboard.table.status')}</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t('dashboard.table.performance')}</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-end">{t('dashboard.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {ads.map(ad => (
                    <tr key={ad.id} className="hover:bg-slate-50/50 transition-all duration-300 group">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl me-5 overflow-hidden shadow-inner flex-shrink-0 border border-slate-200">
                            <img src={`https://picsum.photos/seed/${ad.id}/200/200`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                          </div>
                          <div>
                            <p className="font-black text-sm text-slate-900 mb-1 group-hover:text-blue-600 transition">{ad.title}</p>
                            <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
                              <MapPin size={12} className="me-1.5 text-blue-500" /> {ad.city}, {ad.wilaya}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-start">
                        <p className="text-xs font-black text-slate-500 mb-1 uppercase">{ad.propType}</p>
                        <p className="text-sm font-black text-blue-600">{ad.price}</p>
                      </td>
                      <td className="px-8 py-6 text-start">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          ad.status === 'active' ? 'bg-green-100 text-green-700' : 
                          ad.status === 'paused' ? 'bg-slate-100 text-slate-500' :
                          'bg-red-100 text-red-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full me-2 ${
                             ad.status === 'active' ? 'bg-green-500' : 
                             ad.status === 'paused' ? 'bg-slate-400' :
                             'bg-red-500'
                          }`}></div>
                          {t(`common.${ad.status}`)}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <div className="flex flex-col items-center">
                           <span className="flex items-center font-black text-slate-900 text-xs mb-1">
                             <Eye size={12} className="me-1.5 text-blue-500" /> {ad.views}
                           </span>
                           <span className="flex items-center font-black text-slate-400 text-[10px]">
                             <MessageSquare size={12} className="me-1.5 text-orange-400" /> {ad.contacts}
                           </span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <Link to="/dashboard/analytics" className="p-3 text-blue-600 hover:bg-blue-600 hover:text-white bg-blue-50 rounded-xl transition-all duration-300" title={t('dashboard.menu.stats')}>
                            <BarChart3 size={18} />
                          </Link>
                          <button onClick={() => openBoostModal(ad)} className={`p-3 rounded-xl transition-all ${ad.isBoosted ? 'bg-green-100 text-green-600' : 'bg-slate-900 text-white hover:bg-blue-600'}`} title={t('dashboard.wallet.usageBoost')}>
                            <Rocket size={18} />
                          </button>
                          <button className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl transition" title={t('common.edit')}>
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete(ad.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition" title={t('common.delete')}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
