
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white min-h-screen py-24 px-4 text-start">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-12 text-slate-900 uppercase tracking-tight">{title}</h1>
      <div className="prose prose-slate prose-blue max-w-none space-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const Legal: React.FC = () => {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t('legal.mentionsTitle')}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">{t('legal.editorTitle')}</h2>
        <p className="text-slate-600">{t('legal.editorText')}</p>
        <p className="text-slate-600 font-medium">Contact : contact@dari.dz | +213 (0) 21 00 00 00</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">{t('legal.hostingTitle')}</h2>
        <p className="text-slate-600">{t('legal.hostingText')}</p>
      </section>
    </LegalLayout>
  );
};

export const Terms: React.FC = () => {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t('footer.cgu')}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Objet</h2>
        <p className="text-slate-600">{t('footer.desc')}</p>
      </section>
    </LegalLayout>
  );
};

export const Privacy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t('footer.privacy')}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Données</h2>
        <p className="text-slate-600">Vos données sont collectées pour améliorer nos services Dari.</p>
      </section>
    </LegalLayout>
  );
};
