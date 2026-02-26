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


// Dummy pages (create these files)
// import Products from "./pages/Products";


function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={1500} />
      <NavbarComponent />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HeroSection />} />

        <Route path="/auth"  element={<Auth/>}/>

        <Route path="/cart" element={<Cart/>}/>
        {/* Products Page */}
         <Route path="/products" element={<AllProducts/>} /> 

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<PortfolioBanner />} />

        <Route path="/facilities" element={<Facilities/>}/>

        <Route path="/gallery" element={<PhotoGallery/>}/>

        <Route path="/abroad" element={<CountriesSection/>}/>

        {/* About Page */}
        <Route path="/about" element={<About/>} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;