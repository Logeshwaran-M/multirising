import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Nav";
import HeroSection from "./components/Home";
import PortfolioBanner from "./components/Portfolio";

// Dummy pages (create these files)
// import Products from "./pages/Products";
// import About from "./pages/About";

function App() {
  return (
    <>
      <NavbarComponent />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HeroSection />} />
        {/* Products Page */}
        {/* <Route path="/products" element={<Products />} /> */}

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<PortfolioBanner />} />

        {/* About Page */}
        {/* <Route path="/about" element={<About />} /> */}

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
    </>
  );
}

export default App;