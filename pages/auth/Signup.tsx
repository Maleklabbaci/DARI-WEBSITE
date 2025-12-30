
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, Wallet, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WILAYAS } from '../../constants';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'individual' | 'agency'>('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    contactName: '',
    email: '',
    phone: '',
    wilaya: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (userType === 'individual' && !formData.fullName) return setError("Veuillez saisir votre nom complet.");
    if (userType === 'agency' && !formData.agencyName) return setError("Veuillez saisir le nom de l'agence.");
    if (!formData.email) return setError("Veuillez saisir votre adresse e-mail.");
    if (!formData.phone) return setError("Veuillez saisir votre numéro de téléphone.");
    if (formData.password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (formData.password !== formData.confirmPassword) return setError("Les mots de passe ne correspondent pas.");

    setIsSubmitting(true);
    try {
      await signup({ ...formData, type: userType });
      navigate('/dashboard');
    } catch (err: any) {
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Créer un compte sur Dari</h2>
        <p className="mt-2 text-sm text-slate-600">
          Inscrivez-vous et recevez automatiquement <span className="font-bold text-blue-600">1 000 DA</span> de solde de bienvenue pour tester les options payantes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-3xl sm:px-10">
          {/* User Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserType('individual')}
              className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${userType === 'individual' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-50' : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200'}`}
            >
              <User size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Particulier</span>
            </button>
            <button
              onClick={() => setUserType('agency')}
              className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${userType === 'agency' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-50' : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200'}`}
            >
              <Building2 size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Agence / Pro</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-medium animate-in fade-in zoom-in-95">
              <AlertCircle size={18} className="mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {userType === 'individual' ? (
              <div className="space-y-4 animate-in slide-in-from-left-4 fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Nom complet</label>
                  <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex. Mohamed Benali" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Nom de l'agence</label>
                  <input name="agencyName" type="text" value={formData.agencyName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex. Agence El Amana" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Nom du contact</label>
                    <input name="contactName" type="text" value={formData.contactName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex. Yacine B." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Ville / Wilaya</label>
                    <select name="wilaya" value={formData.wilaya} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">Sélectionner</option>
                      {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">{userType === 'agency' ? 'E-mail pro' : 'Adresse e-mail'}</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex. mohamed@gmail.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Téléphone</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex. 0550 00 00 00" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Mot de passe</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Min. 8 caractères" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Confirmation</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Répétez le mot de passe" />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[10px] text-slate-400 leading-normal mb-4">
                En créant un compte {userType === 'agency' ? 'professionnel' : ''}, vous acceptez les <Link to="/terms" className="text-blue-600 font-bold">Conditions générales d'utilisation</Link> et la <Link to="/privacy" className="text-blue-600 font-bold">Politique de confidentialité</Link> de Dari.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-100 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : userType === 'agency' ? 'Créer mon compte agence' : 'Créer mon compte'}
              </button>
              <p className="mt-4 text-center text-[10px] text-blue-600 font-bold uppercase tracking-widest bg-blue-50 py-2 rounded-lg border border-blue-100">
                Bonus de bienvenue : 1 000 DA offerts
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-sm text-slate-500 font-medium">Déjà un compte ? <Link to="/login" className="text-blue-600 font-bold hover:underline">Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
