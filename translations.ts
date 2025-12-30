
import { Language } from './types';

export const translations: Record<Language, any> = {
  fr: {
    common: {
      da: "DA",
      back: "Retour",
      next: "Suivant",
      confirm: "Confirmer",
      cancel: "Annuler",
      save: "Enregistrer",
      loading: "Chargement...",
      error: "Une erreur est survenue",
      success: "Succès",
      wilaya: "Wilaya",
      city: "Ville / Commune",
      allTypes: "Tous types",
      searchPlaceholder: "Ville ou wilaya"
    },
    header: {
      buy: "Acheter",
      rent: "Louer",
      offices: "Bureaux",
      lands: "Terrains",
      help: "Aide",
      login: "Se connecter",
      signup: "S'inscrire",
      myAccount: "Mon Compte",
      logout: "Se déconnecter",
      dashboard: "Tableau de bord",
      language: "Langue"
    },
    auth: {
      loginTitle: "Connexion à Dari",
      loginSubtitle: "Accédez à vos annonces et votre solde",
      signupTitle: "Créer un compte Dari",
      signupSubtitle: "Rejoignez la plus grande communauté immobilière d'Algérie",
      bonus: "Bonus de bienvenue : 1 000 DA offerts à l'inscription",
      individual: "Particulier",
      agency: "Agence / Pro",
      emailLabel: "Adresse e-mail",
      passwordLabel: "Mot de passe",
      confirmPassword: "Confirmation du mot de passe",
      fullName: "Nom complet",
      agencyName: "Nom de l'agence",
      phone: "Numéro de téléphone",
      noAccount: "Pas encore de compte ?",
      hasAccount: "Déjà inscrit ?",
      forgotPassword: "Mot de passe oublié ?",
      rememberMe: "Se souvenir de moi",
      submitLogin: "Se connecter",
      submitSignup: "Créer mon compte"
    },
    home: {
      heroTitle: "Bienvenue sur Dari – Votre plateforme immobilière en Algérie",
      heroDesc: "Achetez, louez ou publiez vos appartements, maisons et terrains partout en Algérie.",
      discoverAds: "Découvrir les annonces",
      postFree: "Déposer une annonce gratuitement",
      bonus: "1 000 DA offerts à l'inscription.",
      searchLocation: "Localisation",
      searchTransaction: "Transaction",
      searchProperty: "Bien",
      searchBtn: "Rechercher",
      latestOpportunities: "Dernières opportunités immobilières"
    },
    pricing: {
      title: "Offres et abonnements Dari",
      subtitle: "Choisissez l'offre qui correspond le mieux à vos besoins, particuliers ou professionnels.",
      freeTitle: "Gratuit",
      freeTagline: "Pour commencer sereinement",
      freePrice: "0 DA / mois",
      freeFeatures: [
        "Création de compte gratuite",
        "1 000 DA de solde offerts à l'inscription",
        "Messagerie interne",
        "Nombre de numéros limités"
      ],
      freeCta: "Démarrer gratuitement",
      premiumTitle: "Premium",
      premiumTagline: "Pour particuliers sérieux et agences",
      premiumPrice: "2 500 DA / mois",
      premiumFeatures: [
        "Numéros illimités",
        "Plus d'annonces actives (jusqu'à 30)",
        "2 mises en avant incluses (7 jours)",
        "Statistiques détaillées",
        "Moins de publicité"
      ],
      premiumCta: "Choisir l'offre Premium",
      premiumBadge: "Populaire",
      ultimateTitle: "Ultime",
      ultimateTagline: "Pour agences et gros vendeurs",
      ultimatePrice: "6 000 DA / mois",
      ultimateFeatures: [
        "Tout ce qui est inclus dans Premium",
        "Jusqu'à 20 mises en avant offertes / mois",
        "Badge Agence Premium",
        "Page vitrine personnalisée",
        "Support prioritaire 7j/7"
      ],
      ultimateCta: "Choisir l'offre Ultime"
    },
    create: {
      mainTitle: "Déposer une annonce",
      stepOf: "Étape {n} sur 5",
      step1: "Général",
      step2: "Localisation",
      step3: "Détails",
      step4: "Photos",
      step5: "Validation",
      transaction: "Type de transaction",
      sale: "Vente",
      rent: "Location",
      titleLabel: "Titre de l'annonce",
      titlePlaceholder: "Ex: F3 moderne à Alger Centre",
      descLabel: "Description détaillée",
      descPlaceholder: "Décrivez l'état du bien, la vue, le voisinage...",
      iaBtn: "Aide-moi à écrire (IA)",
      priceLabel: "Prix (DA)",
      surfaceLabel: "Surface (m²)",
      roomsLabel: "Nombre de pièces",
      bedrooms: "Chambres",
      floor: "Étage",
      elevator: "Ascenseur",
      parking: "Parking / Garage",
      heating: "Chauffage",
      publishBtn: "Publier l'annonce",
      boostTitle: "Booster ma visibilité",
      boostDesc: "Placez votre annonce en tête de liste pour 7 jours."
    },
    dashboard: {
      hello: "Bonjour,",
      manageAds: "Gérez vos annonces et votre solde.",
      balance: "Mon solde",
      activeAds: "Annonces actives",
      messages: "Messages non lus",
      postAd: "Déposer une annonce",
      menu: {
        home: "Tableau de bord",
        ads: "Mes annonces",
        favs: "Mes favoris",
        alerts: "Mes alertes",
        stats: "Analyses",
        wallet: "Mon solde",
        chat: "Messagerie",
        sub: "Abonnement",
        profile: "Mon profil"
      }
    },
    footer: {
      desc: "Achetez, louez ou publiez vos appartements, maisons, commerces, bureaux et terrains partout en Algérie.",
      dari: {
        title: "DARI",
        about: "À propos de Dari",
        pricing: "Offres & abonnements",
        help: "Aide / FAQ"
      },
      legal: {
        title: "LÉGAL",
        mentions: "Mentions légales",
        terms: "CGU",
        privacy: "Confidentialité"
      },
      contact: {
        title: "CONTACT",
        contact: "Contact",
        partners: "Partenariats",
        becomePartner: "Devenir point de recharge"
      },
      rights: "DARI © {year} – PLATEFORME IMMOBILIÈRE EN ALGÉRIE. TOUS DROITS RÉSERVÉS."
    }
  },
  ar: {
    common: {
      da: "دج",
      back: "رجوع",
      next: "التالي",
      confirm: "تأكيد",
      cancel: "إلغاء",
      save: "حفظ",
      loading: "جاري التحميل...",
      error: "حدث خطأ ما",
      success: "تم بنجاح",
      wilaya: "الولاية",
      city: "البلدية / المدينة",
      allTypes: "كل الأنواع",
      searchPlaceholder: "المدينة أو الولاية"
    },
    header: {
      buy: "شراء",
      rent: "كراء",
      offices: "مكاتب",
      lands: "أراضي",
      help: "مساعدة",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      myAccount: "حسابي",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      language: "اللغة"
    },
    auth: {
      loginTitle: "الدخول إلى داري",
      loginSubtitle: "الوصول إلى إعلاناتك ورصيدك",
      signupTitle: "إنشاء حساب داري",
      signupSubtitle: "انضم إلى أكبر مجتمع عقاري في الجزائر",
      bonus: "هدية ترحيبية: 1,000 دج عند التسجيل",
      individual: "فرد",
      agency: "وكالة / محترف",
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      agencyName: "اسم الوكالة",
      phone: "رقم الهاتف",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "مسجل بالفعل؟",
      forgotPassword: "نسيت كلمة المرور؟",
      rememberMe: "تذكرني",
      submitLogin: "دخول",
      submitSignup: "إنشاء الحساب"
    },
    home: {
      heroTitle: "مرحباً بك في داري – منصتك العقارية في الجزائر",
      heroDesc: "اشترِ، استأجر أو انشر شققك، منازلك وأراضيك في جميع أنحاء الجزائر.",
      discoverAds: "اكتشف الإعلانات",
      postFree: "انشر إعلاناً مجانياً",
      bonus: "1000 دج مهداة عند التسجيل.",
      searchLocation: "الموقع",
      searchTransaction: "المعاملة",
      searchProperty: "العقار",
      searchBtn: "بحث",
      latestOpportunities: "أحدث الفرص العقارية"
    },
    pricing: {
      title: "العروض والاشتراكات في داري",
      subtitle: "اختر العرض الأنسب لاحتياجاتك، سواء كنت فرداً أو محترفاً.",
      freeTitle: "مجاني",
      freeTagline: "لبدء الاستخدام بكل راحة",
      freePrice: "0 دج / شهر",
      freeFeatures: [
        "إنشاء حساب مجاني",
        "1,000 دج رصيد هدية عند التسجيل",
        "مراسلة داخلية عبر داري",
        "عدد محدود من الأرقام المتاحة"
      ],
      freeCta: "ابدأ مجاناً",
      premiumTitle: "بريميوم",
      premiumTagline: "للأفراد الجادّين والوكالات",
      premiumPrice: "2,500 دج / شهر",
      premiumFeatures: [
        "أرقام غير محدودة",
        "عدد أكبر من الإعلانات النشطة (حتى 30)",
        "مُعلَنَان مميّزان مشمولان (7 أيام)",
        "إحصائيات تفصيلية للإعلانات",
        "إعلانات أقل على الواجهة"
      ],
      premiumCta: "اختيار عرض بريميوم",
      premiumBadge: "الأكثر شعبية",
      ultimateTitle: "ألتيم",
      ultimateTagline: "مخصّص للوكالات والبائعين الكبار",
      ultimatePrice: "6,000 دج / شهر",
      ultimateFeatures: [
        "كل مميزات بريميوم",
        "حتى 20 إعلاناً مميّزاً مجاناً كل شهر",
        "شارة وكالة مميّزة",
        "صفحة عرض مخصّصة للوكالة",
        "دعم أولوية على مدار الأسبوع"
      ],
      ultimateCta: "اختيار عرض ألتيم"
    },
    create: {
      mainTitle: "نشر إعلان",
      stepOf: "خطوة {n} من 5",
      step1: "عام",
      step2: "الموقع",
      step3: "التفاصيل",
      step4: "الصور",
      step5: "التأكيد",
      transaction: "نوع المعاملة",
      sale: "بيع",
      rent: "كراء",
      titleLabel: "عنوان الإعلان",
      titlePlaceholder: "مثال: شقة F3 حديثة في وسط الجزائر",
      descLabel: "وصف مفصل",
      descPlaceholder: "صف حالة العقار، الإطلالة، الجيران...",
      iaBtn: "ساعدني في الكتابة (IA)",
      priceLabel: "السعر (دج)",
      surfaceLabel: "المساحة (م²)",
      roomsLabel: "عدد الغرف",
      bedrooms: "غرف النوم",
      floor: "الطابق",
      elevator: "مصعد",
      parking: "مرآب / موقف",
      heating: "تدفئة",
      publishBtn: "نشر الإعلان",
      boostTitle: "زيادة الظهور",
      boostDesc: "ضع إعلانك في أعلى القائمة لمدة 7 أيام."
    },
    dashboard: {
      hello: "مرحباً،",
      manageAds: "إدارة إعلاناتك ورصيدك.",
      balance: "رصيدي",
      activeAds: "إعلانات نشطة",
      messages: "رسائل غير مقروءة",
      postAd: "نشر إعلان",
      menu: {
        home: "لوحة التحكم",
        ads: "إعلاناتي",
        favs: "المفضلات",
        alerts: "التنبيهات",
        stats: "التحليلات",
        wallet: "رصيدي",
        chat: "الرسائل",
        sub: "الاشتراك",
        profile: "ملفي الشخصي"
      }
    },
    footer: {
      desc: "اشترِ، استأجر أو انشر شققك، منازلك، محلاتك التجارية، مكاتبك وأراضيك في جميع أنحاء الجزائر.",
      dari: {
        title: "داري",
        about: "حول داري",
        pricing: "العروض والاشتراكات",
        help: "المساعدة / الأسئلة الشائعة"
      },
      legal: {
        title: "قانوني",
        mentions: "إشعار قانوني",
        terms: "شروط الاستخدام",
        privacy: "الخصوصية"
      },
      contact: {
        title: "اتصل بنا",
        contact: "اتصل",
        partners: "الشراكات",
        becomePartner: "كن نقطة شحن"
      },
      rights: "داري © {year} – منصة عقارية في الجزائر. جميع الحقوق محفوظة."
    }
  },
  en: {
    common: {
      da: "DA",
      back: "Back",
      next: "Next",
      confirm: "Confirm",
      cancel: "Cancel",
      save: "Save",
      loading: "Loading...",
      error: "Something went wrong",
      success: "Success",
      wilaya: "Wilaya",
      city: "City / Town",
      allTypes: "All types",
      searchPlaceholder: "City or Wilaya"
    },
    header: {
      buy: "Buy",
      rent: "Rent",
      offices: "Offices",
      lands: "Lands",
      help: "Help",
      login: "Login",
      signup: "Sign Up",
      myAccount: "My Account",
      logout: "Logout",
      dashboard: "Dashboard",
      language: "Language"
    },
    auth: {
      loginTitle: "Login to Dari",
      loginSubtitle: "Access your listings and balance",
      signupTitle: "Create a Dari Account",
      signupSubtitle: "Join Algeria's largest real estate community",
      bonus: "Welcome bonus: 1,000 DA offered on registration",
      individual: "Individual",
      agency: "Agency / Pro",
      emailLabel: "Email address",
      passwordLabel: "Password",
      confirmPassword: "Confirm password",
      fullName: "Full name",
      agencyName: "Agency name",
      phone: "Phone number",
      noAccount: "No account yet?",
      hasAccount: "Already registered?",
      forgotPassword: "Forgot password?",
      rememberMe: "Remember me",
      submitLogin: "Login",
      submitSignup: "Create my account"
    },
    home: {
      heroTitle: "Welcome to Dari – Your real estate platform in Algeria",
      heroDesc: "Buy, rent or publish your apartments, houses and lands anywhere in Algeria.",
      discoverAds: "Discover Ads",
      postFree: "Post a Free Ad",
      bonus: "1,000 DA offered upon registration.",
      searchLocation: "Location",
      searchTransaction: "Transaction",
      searchProperty: "Property",
      searchBtn: "Search",
      latestOpportunities: "Latest Opportunities"
    },
    pricing: {
      title: "Dari plans & subscriptions",
      subtitle: "Choose the plan that best fits your needs, whether you're an individual or a professional.",
      freeTitle: "Free",
      freeTagline: "To get started safely",
      freePrice: "0 DA / month",
      freeFeatures: [
        "Free account creation",
        "1,000 DA welcome balance at signup",
        "Built-in messaging",
        "Limited phone numbers"
      ],
      freeCta: "Start for free",
      premiumTitle: "Premium",
      premiumTagline: "For serious individuals and agencies",
      premiumPrice: "2,500 DA / month",
      premiumFeatures: [
        "Unlimited phone numbers",
        "More active listings (up to 30)",
        "2 boosted listings included (7 days)",
        "Detailed statistics",
        "Fewer ads"
      ],
      premiumCta: "Choose Premium",
      premiumBadge: "Popular",
      ultimateTitle: "Ultimate",
      ultimateTagline: "For agencies and heavy sellers",
      ultimatePrice: "6,000 DA / month",
      ultimateFeatures: [
        "Everything in Premium",
        "Up to 20 boosted listings per month",
        "Premium Agency badge",
        "Custom agency showcase page",
        "Priority support 7/7"
      ],
      ultimateCta: "Choose Ultimate"
    },
    create: {
      mainTitle: "Post an Ad",
      stepOf: "Step {n} of 5",
      step1: "General",
      step2: "Location",
      step3: "Details",
      step4: "Photos",
      step5: "Validation",
      transaction: "Transaction Type",
      sale: "Sale",
      rent: "Rent",
      titleLabel: "Listing Title",
      titlePlaceholder: "Ex: Modern F3 in Algiers Center",
      descLabel: "Detailed Description",
      descPlaceholder: "Describe the property condition, view, neighborhood...",
      iaBtn: "Help me write (AI)",
      priceLabel: "Price (DA)",
      surfaceLabel: "Surface (sqm)",
      roomsLabel: "Number of rooms",
      bedrooms: "Bedrooms",
      floor: "Floor",
      elevator: "Elevator",
      parking: "Parking / Garage",
      heating: "Heating",
      publishBtn: "Publish Ad",
      boostTitle: "Boost Visibility",
      boostDesc: "Place your ad at the top of the list for 7 days."
    },
    dashboard: {
      hello: "Hello,",
      manageAds: "Manage your listings and balance.",
      balance: "Balance",
      activeAds: "Active Ads",
      messages: "Unread Messages",
      postAd: "Post an Ad",
      menu: {
        home: "Dashboard",
        ads: "My Listings",
        favs: "Favorites",
        alerts: "Alerts",
        stats: "Analytics",
        wallet: "My Balance",
        chat: "Messages",
        sub: "Subscription",
        profile: "My Profile"
      }
    },
    footer: {
      desc: "Buy, rent or publish your apartments, houses, shops, offices and lands throughout Algeria.",
      dari: {
        title: "DARI",
        about: "About Dari",
        pricing: "Offers & Subscriptions",
        help: "Help / FAQ"
      },
      legal: {
        title: "LEGAL",
        mentions: "Legal Notice",
        terms: "Terms of Use",
        privacy: "Privacy Policy"
      },
      contact: {
        title: "CONTACT",
        contact: "Contact",
        partners: "Partnerships",
        becomePartner: "Become a recharge point"
      },
      rights: "DARI © {year} – REAL ESTATE PLATFORM IN ALGERIA. ALL RIGHTS RESERVED."
    }
  }
};
