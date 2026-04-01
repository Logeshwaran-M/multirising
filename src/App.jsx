import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Nav";
import HeroSection from "./components/Home";
import PortfolioBanner from "./components/Portfolio";
import About from "./components/About";
import Footer from "./components/Footer";
import Facilities from "./components/Facilities";
import CountriesSection from "./components/SendAbroad";
import PhotoGallery from "./components/Gallery";
import AllProducts from "./components/AllProducts";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/ProductDetails";
import DeliveryForm from "./components/DeliveryForm";
import ArecaLifecycle from "./components/Process";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CheckoutIndia from "./components/checkoutpages/IndianCheckout";
import CheckoutInternational from "./components/checkoutpages/InternationalCheckout";
import MyOrders from "./components/Myorders";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Terms from "./components/legal/Terms";
import ShippingPolicy from "./components/legal/ShippingPolicy";
import RefundPolicy from "./components/legal/RefundPolicy";
import Wishlist from "./components/WishList";
import ContactUs from "./components/Contact";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import TrackOrder from "./components/TrackOrder";
import ArecaBlog from "./components/Blog";


// Dummy pages (create these files)
// import Products from "./pages/Products";


function App() {

  useEffect(() => {
  AOS.init({
    duration: 1000, // animation speed
    once: true,     // animation happens only once
  });
}, []);
const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim();
  return (
    <>
     <ToastContainer position="top-right" autoClose={1500} />
      <NavbarComponent />
     

        {console.log("PayPal Client ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID)}
      <Routes>
        {/* Home Page */}
    
        <Route path="/" element={<HeroSection />} />

        <Route path="/auth"  element={<Auth/>}/>

        <Route path="/cart" element={<Cart/>}/>
          <Route path="/DeliveryForm" element={<DeliveryForm/>}/>

        {/* Products Page */}
         <Route path="/products" element={<AllProducts/>} />
           <Route path="/product/:id" element={<ProductDetails />} /> 

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<PortfolioBanner />} />

        <Route path="/facilities" element={<Facilities/>}/>

        <Route path="/gallery" element={<PhotoGallery/>}/>
        <Route path="/process" element={<ArecaLifecycle/>}/>

        <Route path="/abroad" element={<CountriesSection/>}/>

        {/* About Page */}
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>}/>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />

        <Route path="/checkout-india" element={<CheckoutIndia />} />
             
<Route path="/checkout-international" element={<CheckoutInternational />} />

<Route path="/orders" element={<MyOrders />} />

<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/shipping-policy" element={<ShippingPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/wishlist" element={<Wishlist/>}/>
<Route path="/track" element={<TrackOrder/>}/>
<Route path="/blog" element={<ArecaBlog/>}/>

      </Routes>
     
      <Footer/>
    </>
  );
}

export default App;