
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ChevronLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition">
          <ChevronLeft size={16} className="mr-1" /> Retour à la connexion
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900">Mot de passe oublié</h2>
        {!sent ? (
          <p className="mt-2 text-sm text-slate-600">
            Entrez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        ) : (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start">
            <CheckCircle className="text-green-500 mr-3 mt-0.5" size={20} />
            <p className="text-sm text-green-800 font-medium">
              Si un compte Dari existe avec cette adresse, un e-mail de réinitialisation vient de vous être envoyé. Pensez à vérifier votre dossier spam.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {!sent && (
          <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-3xl sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="block text-sm font-bold text-slate-700">Adresse e-mail</label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 sm:text-sm bg-slate-50"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
