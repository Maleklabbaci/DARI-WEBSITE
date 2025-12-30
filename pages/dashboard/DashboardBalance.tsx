
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, CreditCard, QrCode, CheckCircle2, AlertCircle, Info, Landmark, History, ShieldCheck, TrendingUp, Lock, Crown, PlusCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';

export const DashboardBalance: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const [rechargeCode, setRechargeCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rechargeAmount, setRechargeAmount] = useState<number | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (!user) return null;

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (rechargeCode.length >= 8) {
      setStatus('loading');
      setTimeout(() => {
        updateBalance(2000); 
        setStatus('success');
        setRechargeCode('');
        setTimeout(() => setStatus('idle'), 3000);
      }, 1200);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleRecharge = () => {
    if (!rechargeAmount) return;
    setPaymentLoading(true);
    setTimeout(() => {
      updateBalance(rechargeAmount);
      setPaymentLoading(false);
      setRechargeAmount(null);
      alert(`Votre solde a été crédité de ${rechargeAmount} DA !`);
    }, 1500);
  };

  const transactions = [
    { id: '1', date: 'Aujourd\'hui', type: 'Recharge', amount: '+ 2 000 DA', status: 'Réussi' },
    { id: '2', date: '22/03/2024', type: 'Mise en avant', amount: '- 500 DA', status: 'Réussi' },
    { id: '3', date: '18/03/2024', type: 'Bonus Inscription', amount: '+ 1 000 DA', status: 'Réussi' }
  ];

  const quickAmounts = [
    { label: "+ 1 000 DA", value: 1000 },
    { label: "+ 2 500 DA (Premium)", value: 2500 },
    { label: "+ 6 000 DA (Ultime)", value: 6000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DashboardSidebar />

        <div className="lg:col-span-3 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Mon solde</h1>
               <p className="text-sm font-medium text-slate-500 mt-1">Gérez votre portefeuille Dari en dinars algériens (DZD).</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><Wallet size={18} /></div>
                <p className="text-xs font-black text-blue-200 uppercase tracking-[0.3em]">Solde disponible</p>
              </div>
              <h2 className="text-6xl font-black mb-12 tracking-tight">{user.balance.toLocaleString()} <span className="text-2xl font-bold text-slate-500 tracking-normal">DA</span></h2>
              
              <div className="p-5 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 flex items-center space-x-6">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <p className="text-xs font-medium text-blue-100 leading-relaxed">
                    Utilisez votre solde pour <span className="font-black text-white">booster vos annonces</span> ou débloquer des numéros de téléphone.
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight flex items-center">
               <Info className="mr-3 text-blue-600" size={24} /> Que puis-je faire avec mon solde ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp className="text-blue-600" />, title: "Mises en avant", desc: "Boostez vos annonces pour apparaître en tête de liste." },
                { icon: <Lock className="text-orange-600" />, title: "Débloquer des numéros", desc: "Accédez aux coordonnées directes des vendeurs/bailleurs." },
                { icon: <Crown className="text-purple-600" />, title: "S'abonner (Premium/Ultime)", desc: "Payez vos mensualités directement avec votre solde." },
                { icon: <PlusCircle className="text-green-600" />, title: "Options Visibilité", desc: "Achetez des badges et des options de visibilité accrue." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-5 p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-100 transition duration-300">
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      {item.icon}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
              <h3 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight flex items-center">
                 <CreditCard className="mr-3 text-blue-600" size={24} /> Recharger mon solde
              </h3>
              
              <div className="space-y-4 mb-10">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Montant à recharger</p>
                 <div className="grid grid-cols-2 gap-3">
                    {quickAmounts.map((amt) => (
                      <button 
                        key={amt.value}
                        onClick={() => setRechargeAmount(amt.value)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 font-bold text-xs ${rechargeAmount === amt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-blue-200'}`}
                      >
                        {amt.label}
                      </button>
                    ))}
                    <input 
                      type="number" 
                      placeholder="Autre montant"
                      onChange={(e) => setRechargeAmount(parseInt(e.target.value))}
                      className="p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none transition"
                    />
                 </div>
              </div>

              <div className="space-y-4 mb-10">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Moyen de paiement</p>
                 <div className="space-y-3">
                    {[
                      { id: 'cib', label: 'Carte Bancaire / EDAHABIA', icon: <CreditCard className="text-blue-600" /> },
                      { id: 'ccp', label: 'Virement / CCP', icon: <Landmark className="text-purple-600" /> }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-200 transition group">
                         <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition">{method.icon}</div>
                            <span className="text-sm font-bold text-slate-700">{method.label}</span>
                         </div>
                         <input type="radio" name="payment" className="w-5 h-5 text-blue-600" defaultChecked={method.id === 'cib'} />
                      </label>
                    ))}
                 </div>
              </div>

              <button 
                onClick={handleRecharge}
                disabled={paymentLoading || !rechargeAmount}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95 mt-auto disabled:opacity-50 flex items-center justify-center"
              >
                 {paymentLoading ? <Loader2 className="animate-spin" /> : 'Valider et recharger'}
              </button>
            </div>

            <div className="bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl text-white flex flex-col h-full relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-xl font-black mb-8 uppercase tracking-tight flex items-center">
                 <QrCode className="mr-3" size={24} /> Code de recharge Dari
              </h3>
              <p className="text-sm text-blue-100 font-medium mb-10 leading-relaxed">
                Saisissez un code acheté auprès d'un partenaire.
              </p>
              
              <form onSubmit={handleValidateCode} className="space-y-4">
                <input 
                  type="text" 
                  value={rechargeCode}
                  onChange={(e) => setRechargeCode(e.target.value.toUpperCase())}
                  placeholder="EX: DARI-9F4K-2L8P" 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 font-black text-white text-center tracking-[0.3em] outline-none focus:bg-white/20 transition placeholder:text-blue-300 placeholder:tracking-normal placeholder:font-bold"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition shadow-2xl shadow-blue-900/30 active:scale-95 disabled:opacity-50 flex items-center justify-center"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Valider le code'}
                </button>
              </form>

              {status === 'success' && (
                <div className="mt-6 flex items-center bg-white/20 p-4 rounded-xl text-xs font-bold animate-in zoom-in-95">
                  <CheckCircle2 size={16} className="mr-2" /> Code validé ! + 2 000 DA ajoutés.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-6 flex items-center bg-red-500/20 p-4 rounded-xl text-xs font-bold animate-in shake">
                  <AlertCircle size={16} className="mr-2" /> Code trop court.
                </div>
              )}

              <div className="mt-auto pt-10">
                <Link to="/partners" className="text-xs font-black text-blue-200 hover:text-white transition uppercase tracking-widest flex items-center">
                   Où acheter un code ? <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center">
                <History size={20} className="mr-3 text-slate-400" /> Historique de mes opérations
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type d'opération</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition duration-300">
                      <td className="px-10 py-5 text-sm font-medium text-slate-500">{t.date}</td>
                      <td className="px-10 py-5 text-sm font-black text-slate-900">{t.type}</td>
                      <td className={`px-10 py-5 text-sm font-black ${t.amount.startsWith('+') ? 'text-green-600' : 'text-slate-900'}`}>{t.amount}</td>
                      <td className="px-10 py-5 text-right">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-green-100 text-green-700 uppercase tracking-widest">
                          <ShieldCheck size={12} className="mr-1.5" /> {t.status}
                        </span>
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
