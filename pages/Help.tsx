
import React from 'react';
import { Search, HelpCircle, Wallet, List, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Help: React.FC = () => {
  const { t } = useLanguage();
  const categories = [
    { 
      title: t('help.catAccount'), 
      icon: <HelpCircle className="text-blue-600" />,
      faqs: [
        { q: "Comment créer un compte ?", a: "Cliquez sur 'S'inscrire', remplissez le formulaire et validez. Vous recevrez 1 000 DA de solde de bienvenue." },
        { q: "Mon compte est-il payant ?", a: "La création de compte est gratuite. Les options Premium et Ultime sont payantes, mais facultatives." }
      ]
    },
    { 
      title: t('help.catWallet'), 
      icon: <Wallet className="text-green-600" />,
      faqs: [
        { q: "Qu'est-ce que le solde Dari ?", a: "C'est un portefeuille en DZD dans votre compte, que vous pouvez utiliser pour payer des mises en avant, débloquer des numéros ou souscrire un abonnement." },
        { q: "Comment recharger mon solde ?", a: "Depuis 'Mon solde', choisissez une méthode de recharge (carte, virement, code, etc.)." },
        { q: "Puis-je retirer mon solde ?", a: "Non, le solde Dari sert uniquement aux services proposés sur la plateforme." }
      ]
    },
    { 
      title: t('help.catAds'), 
      icon: <List className="text-purple-600" />,
      faqs: [
        { q: "Comment déposer une annonce ?", a: "Depuis votre tableau de bord, cliquez sur 'Déposer une annonce' et suivez les étapes." },
        { q: "Combien de temps l'annonce reste en ligne ?", a: "Par défaut, une annonce reste en ligne 30 jours, renouvelables." }
      ]
    },
    { 
      title: t('help.catSafety'), 
      icon: <ShieldCheck className="text-orange-600" />,
      faqs: [
        { q: "Comment éviter les arnaques ?", a: "Ne payez jamais avant d'avoir visité le bien et vérifié les documents. Utilisez la messagerie Dari pour garder une trace des échanges." },
        { q: "Comment signaler une annonce suspecte ?", a: "Utilisez le bouton 'Signaler' présent sur la fiche de chaque annonce pour alerter nos équipes." }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-start">
      <div className="bg-blue-600 pt-24 pb-32 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">{t('header.help')}</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute start-4 top-4 text-slate-400" />
          <input type="text" placeholder={t('help.searchPlaceholder')} className="w-full ps-12 pe-6 py-4 rounded-2xl bg-white shadow-xl outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                <div className="p-3 bg-slate-50 rounded-xl">{cat.icon}</div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
              </div>
              <div className="space-y-6">
                {cat.faqs.map((faq, j) => (
                  <div key={j} className="group cursor-pointer">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
