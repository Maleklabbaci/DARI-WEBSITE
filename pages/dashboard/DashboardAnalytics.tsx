
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer2, PhoneCall, Calendar, Users, ArrowUpRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BoostAnalytics } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardAnalytics: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [period, setPeriod] = useState('30');

  const mockAnalytics: BoostAnalytics[] = [
    {
      id: 'b1',
      listingTitle: 'Magnifique F4 vue sur mer',
      startDate: '2024-03-10',
      endDate: '2024-03-17',
      status: 'completed',
      budget: 3500,
      estimatedReach: [1200, 1800],
      results: {
        impressions: 1654,
        clicks: 342,
        messages: 12,
        phoneReveals: 28
      }
    },
    {
      id: 'b2',
      listingTitle: 'Studio moderne centre-ville',
      startDate: '2024-03-22',
      endDate: '2024-03-25',
      status: 'active',
      budget: 1500,
      estimatedReach: [450, 600],
      results: {
        impressions: 489,
        clicks: 86,
        messages: 3,
        phoneReveals: 7
      }
    }
  ];

  if (!user) return null;

  const calculateCTR = (clicks: number, impressions: number) => ((clicks / impressions) * 100).toFixed(1);
  const calculateCostPerContact = (budget: number, contacts: number) => contacts > 0 ? (budget / contacts).toFixed(0) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">{t('dashboard.menu.stats')}</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">{t('dashboard.statsSubtitle')}</p>
            </div>
            
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              {['7', '30', '90'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${period === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600'}`}>
                  {p} {t('common.days')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[
               { label: "Impressions", val: "2,143", icon: <Eye />, color: "text-blue-600", bg: "bg-blue-50" },
               { label: "Clics", val: "428", icon: <MousePointer2 />, color: "text-purple-600", bg: "bg-purple-50" },
               { label: "Messages", val: "15", icon: <MessageSquare />, color: "text-orange-600", bg: "bg-orange-50" },
               { label: t('listing.unlockPhone'), val: "35", icon: <PhoneCall />, color: "text-green-600", bg: "bg-green-50" },
             ].map((stat, i) => (
               <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                  <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                    {stat.icon}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.val}</p>
               </div>
             ))}
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="font-black text-slate-900 uppercase tracking-tight flex items-center">
                <BarChart3 size={20} className="me-3 text-blue-600" /> {t('dashboard.analytics.chartTitle')}
              </h3>
            </div>
            <div className="h-64 w-full bg-slate-50 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 flex items-end justify-between px-8 py-6">
                 {[40, 65, 55, 80, 70, 95, 85, 100, 90, 110, 105, 120].map((h, i) => (
                   <div key={i} className="flex flex-col items-center space-y-2 group/bar">
                     <div className="w-3 bg-blue-100 rounded-t-lg transition-all group-hover/bar:bg-blue-600" style={{ height: `${h}%` }}></div>
                     <div className="w-3 bg-purple-100 rounded-t-lg transition-all group-hover/bar:bg-purple-600" style={{ height: `${h * 0.4}%` }}></div>
                   </div>
                 ))}
               </div>
               <div className="relative z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition duration-300 shadow-xl font-bold text-xs">
                 {t('dashboard.analytics.realtime')}
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{t('dashboard.analytics.boostDetails')}</h3>
            {mockAnalytics.map((boost) => (
              <div key={boost.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center space-x-5 rtl:space-x-reverse">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${boost.status === 'active' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition">{boost.listingTitle}</h4>
                      <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        <Calendar size={12} className="me-1.5" /> {t('dashboard.analytics.dateRange').replace('{start}', boost.startDate).replace('{end}', boost.endDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${boost.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {boost.status === 'active' ? t('common.active') : t('common.expired')}
                    </span>
                    <div className="text-end">
                      <p className="text-[10px] font-black text-slate-400 uppercase">{t('dashboard.analytics.investedBudget')}</p>
                      <p className="text-sm font-black text-slate-900">{boost.budget.toLocaleString()} {t('common.da')}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-slate-50/50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Impressions</p>
                    <p className="text-xl font-black text-slate-900">{boost.results.impressions.toLocaleString()}</p>
                    <div className="mt-2 flex items-center text-[9px] font-bold text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded">
                      <Users size={10} className="me-1" /> {boost.estimatedReach[0]}-{boost.estimatedReach[1]} {t('listing.estimatedReach')}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('dashboard.analytics.ctr')}</p>
                    <p className="text-xl font-black text-slate-900">{calculateCTR(boost.results.clicks, boost.results.impressions)}%</p>
                    <div className="mt-2 flex items-center text-[9px] font-bold text-green-600">
                      <ArrowUpRight size={12} className="me-0.5" /> +2.4%
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('dashboard.analytics.contactsReceived')}</p>
                    <p className="text-xl font-black text-slate-900">{boost.results.messages + boost.results.phoneReveals}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{boost.results.messages} msg / {boost.results.phoneReveals} num</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('dashboard.analytics.costPerContact')}</p>
                    <p className="text-xl font-black text-blue-600">{calculateCostPerContact(boost.budget, boost.results.messages + boost.results.phoneReveals)} <span className="text-[10px] text-slate-400">{t('common.da')}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
