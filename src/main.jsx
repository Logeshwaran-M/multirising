import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "../src/components/CartContext.jsx";
import "aos/dist/aos.css";
import "./i18n";
import "bootstrap-icons/font/bootstrap-icons.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "AYnQ1cqsKXu-qYf60TNS8c8lgUL_zMn6JOj2WUtc-bc8r_6mRfxzh0p3hqBRL6hIbSNPEPigSfYqSbiT",
  currency: "USD",
  intent: "capture",
};


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <PayPalScriptProvider options={initialOptions}>
 <CartProvider>
    <App />
    </CartProvider>
    </PayPalScriptProvider>
    </BrowserRouter>

)
