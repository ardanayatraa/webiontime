import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Catalog from './pages/Catalog';
import Explore from './pages/Explore';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Layout Utama dengan Konten */}
        <div className="flex-1 w-full pt-24"> {/* Add pt-24 to create space for fixed navbar */}
          {/* Konten Utama */}
          <main className="flex justify-center items-center ">
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
