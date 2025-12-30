
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, Send, ShieldAlert, Inbox, SendHorizontal, Archive, MoreVertical, Phone } from 'lucide-react';
import { DashboardSidebar } from '../../components/DashboardSidebar';

type Tab = 'inbox' | 'sent' | 'archived';

export const DashboardMessages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>('inbox');

  const chats = {
    inbox: [
      { id: 1, name: 'Imen Benali', property: 'Appartement F3 Bab Ezzouar', lastMsg: 'Est-ce que le prix est négociable ?', time: '14:30', unread: true },
      { id: 2, name: 'Karim Immo', property: 'Studio Centre Oran', lastMsg: 'D\'accord, j\'attends votre appel.', time: 'Hier', unread: false }
    ],
    sent: [
      { id: 3, name: 'Agence Horizon', property: 'Villa Tipaza', lastMsg: 'Je souhaiterais visiter ce samedi.', time: 'Il y a 2 jours', unread: false }
    ],
    archived: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden h-[750px] flex flex-col md:flex-row">
            {/* Inbox List */}
            <div className="w-full md:w-96 border-r border-slate-100 flex flex-col bg-slate-50/30">
              <div className="p-8 pb-4">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Messagerie</h2>
                
                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
                  <button 
                    onClick={() => setActiveTab('inbox')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'inbox' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Inbox size={14} />
                    <span>Reçus</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('sent')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'sent' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <SendHorizontal size={14} />
                    <span>Envoyés</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('archived')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'archived' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Archive size={14} />
                    <span>Archivés</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
                  <input type="text" placeholder="Rechercher..." className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm" />
                </div>
              </div>

              <div className="flex-grow overflow-y-auto px-4 pb-8 space-y-2">
                {chats[activeTab].length > 0 ? (
                  chats[activeTab].map(chat => (
                    <button 
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`w-full p-5 text-left rounded-3xl border transition-all duration-300 relative group ${activeChat?.id === chat.id ? 'bg-white border-blue-100 shadow-lg ring-1 ring-blue-50/50 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/60 hover:border-slate-100'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${activeChat?.id === chat.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {chat.name.charAt(0)}
                          </div>
                          <span className="font-black text-sm text-slate-900">{chat.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1.5">{chat.property}</p>
                      <p className={`text-xs truncate leading-relaxed ${chat.unread ? 'text-slate-900 font-black' : 'text-slate-500 font-medium'}`}>{chat.lastMsg}</p>
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400 px-8 text-center">
                    <Inbox size={48} className="mb-4 opacity-10" />
                    <p className="text-xs font-bold">Aucun message.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Content */}
            <div className="hidden md:flex flex-grow flex-col bg-white">
              {activeChat ? (
                <>
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-lg">
                        {activeChat.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900">{activeChat.name}</h3>
                        <Link to={`/property/1`} className="text-[11px] text-blue-600 font-black uppercase tracking-widest hover:underline">{activeChat.property}</Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-3 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition">
                        <Phone size={20} />
                      </button>
                      <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-grow p-10 overflow-y-auto space-y-8 bg-slate-50/20">
                    <div className="flex flex-col items-center mb-8">
                       <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 flex items-start max-w-lg shadow-sm">
                        <ShieldAlert className="text-orange-600 mr-4 mt-0.5 flex-shrink-0" size={20} />
                        <p className="text-xs text-orange-800 font-medium leading-relaxed">
                          <span className="font-black block mb-1">Sécurité Dari</span>
                          Ne partagez jamais de coordonnées bancaires ou de documents sensibles sans vérification.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="flex items-end space-x-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 flex-shrink-0">IB</div>
                        <div className="bg-white p-5 rounded-[2rem] rounded-bl-none shadow-sm border border-slate-100">
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">Bonjour ! Votre appartement à Bab Ezzouar m'intéresse beaucoup. Est-ce que le prix est négociable ?</p>
                          <p className="text-[10px] font-black text-slate-300 mt-3 text-right">14:30</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="flex items-end space-x-3 max-w-[80%] flex-row-reverse space-x-reverse">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">M</div>
                        <div className="bg-blue-600 p-5 rounded-[2rem] rounded-br-none shadow-xl shadow-blue-100">
                          <p className="text-sm text-white font-medium leading-relaxed">Bonjour. Oui, une petite négociation est possible après visite si vous êtes sérieux. Quand souhaiteriez-vous passer ?</p>
                          <p className="text-[10px] font-black text-blue-300 mt-3 text-right">14:35</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-white border-t border-slate-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-grow relative">
                        <input 
                          type="text" 
                          placeholder="Tapez votre message..." 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-50 transition shadow-inner"
                        />
                      </div>
                      <button className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl active:scale-90 group">
                        <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-400 bg-slate-50/20">
                  <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
                    <MessageSquare size={40} className="opacity-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Sélectionnez une conversation</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
