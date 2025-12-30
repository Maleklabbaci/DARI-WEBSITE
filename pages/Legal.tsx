
import React from 'react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white min-h-screen py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-12 text-slate-900">{title}</h1>
      <div className="prose prose-slate prose-blue max-w-none space-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const Legal: React.FC = () => (
  <LegalLayout title="Mentions Légales">
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Éditeur du site</h2>
      <p className="text-slate-600">Le site Dari est édité par la société DARI IMMO DZ, société par actions simplifiée au capital de 1.000.000 DA, dont le siège social est situé à Alger, Algérie.</p>
      <p className="text-slate-600 font-medium">Contact : contact@dari.dz | +213 (0) 21 00 00 00</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">2. Responsable de la publication</h2>
      <p className="text-slate-600">Le responsable de la publication du site est M. Mohamed Ali, en sa qualité de Gérant de la société DARI IMMO DZ.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">3. Hébergement</h2>
      <p className="text-slate-600">Ce site est hébergé par Algerie Cloud Services, garantissant une souveraineté et une haute disponibilité des données pour les utilisateurs sur le territoire national.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">4. Propriété intellectuelle</h2>
      <p className="text-slate-600">L'ensemble des éléments constituant le site Dari (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, logos, marques, etc.) sont protégés par le droit d'auteur et le droit des marques.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">5. Limitation de responsabilité</h2>
      <p className="text-slate-600">Dari s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.</p>
    </section>
  </LegalLayout>
);

export const Terms: React.FC = () => (
  <LegalLayout title="Conditions Générales d'Utilisation (CGU)">
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Objet de la plateforme Dari</h2>
      <p className="text-slate-600">Dari est une plateforme de mise en relation entre vendeurs, bailleurs et acquéreurs/locataires de biens immobiliers en Algérie.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">2. Création et gestion de compte</h2>
      <p className="text-slate-600">L'accès à certains services nécessite la création d'un compte. L'utilisateur est responsable du maintien de la confidentialité de ses identifiants.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">3. Publication d'annonces</h2>
      <p className="text-slate-600">L'utilisateur s'engage à ne publier que des informations exactes et licites. Dari se réserve le droit de supprimer toute annonce non conforme.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">4. Utilisation du solde et services payants</h2>
      <p className="text-slate-600">Le solde Dari est crédité en Dinars Algériens (DZD). Il permet de payer les options de mise en avant et les abonnements. Le solde n'est pas remboursable ni retirable.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">5. Règles de sécurité et comportement</h2>
      <p className="text-slate-600">Les utilisateurs doivent agir de bonne foi. Toute tentative de fraude ou comportement inapproprié entraînera la suspension du compte.</p>
    </section>
  </LegalLayout>
);

export const Privacy: React.FC = () => (
  <LegalLayout title="Politique de Confidentialité">
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">1. Données collectées</h2>
      <p className="text-slate-600">Nous collectons des données telles que votre nom, adresse e-mail, numéro de téléphone, ainsi que les détails des annonces que vous publiez.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">2. Utilisation des données</h2>
      <p className="text-slate-600">Vos données sont utilisées pour la gestion de votre compte, la mise en relation avec d'autres utilisateurs et l'amélioration de nos services statistiques.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">3. Partage des données</h2>
      <p className="text-slate-600">Dari s'engage à ne jamais revendre vos données à des tiers sans votre consentement explicite, sauf obligations légales.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">4. Durée de conservation</h2>
      <p className="text-slate-600">Vos données sont conservées tant que votre compte est actif ou selon les durées légales de conservation.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">5. Vos droits</h2>
      <p className="text-slate-600">Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles depuis votre profil.</p>
    </section>
  </LegalLayout>
);
