import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome Back",
      createAccount: "Create Account",
      email: "Email Address",
      password: "Password",
      login: "Login",
      register: "Register",
      indianCheckout: "Indian Checkout",
      internationalCheckout: "International Checkout",
      cart: "Shopping Cart",
    },
  },

  hi: {
    translation: {
      welcome: "वापसी पर स्वागत है",
      createAccount: "खाता बनाएं",
      email: "ईमेल पता",
      password: "पासवर्ड",
      login: "लॉगिन",
      register: "रजिस्टर",
      indianCheckout: "भारतीय चेकआउट",
      internationalCheckout: "अंतरराष्ट्रीय चेकआउट",
      cart: "शॉपिंग कार्ट",
    },
  },

  ar: {
    translation: {
      welcome: "مرحبًا بعودتك",
      createAccount: "إنشاء حساب",
      email: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      login: "تسجيل الدخول",
      register: "تسجيل",
      indianCheckout: "الدفع الهندي",
      internationalCheckout: "الدفع الدولي",
      cart: "سلة التسوق",
    },
  },

  fr: {
    translation: {
      welcome: "Bon retour",
      createAccount: "Créer un compte",
      email: "Adresse e-mail",
      password: "Mot de passe",
      login: "Connexion",
      register: "S'inscrire",
      indianCheckout: "Paiement Indien",
      internationalCheckout: "Paiement International",
      cart: "Panier",
    },
  },

  es: {
    translation: {
      welcome: "Bienvenido de nuevo",
      createAccount: "Crear cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      login: "Iniciar sesión",
      register: "Registrarse",
      indianCheckout: "Pago Indio",
      internationalCheckout: "Pago Internacional",
      cart: "Carrito de compras",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;