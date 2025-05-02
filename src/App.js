import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
// import PartnersSection from './components/PartnersSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import BlogList from './components/BlogList';
import BlogAdmin from './components/BlogAdmin';
import AdminLogin from './components/AdminLogin';
import TestimonialList from './components/TestimonialList';
import TestimonialAdmin from './components/TestimonialAdmin';
import LatestBlog from './components/LatestBlog';
import { auth } from './firebase';
import { signOut } from "firebase/auth";

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => setAdmin(user));
    return unsub;
  }, []);

  const handleAdminLogout = async () => {
    await signOut(auth);
    setAdmin(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/admin"
            element={
              admin ? (
                <>
                  <Navbar admin onLogout={handleAdminLogout} />
                  <BlogAdmin />
                  <TestimonialAdmin />
                </>
              ) : (
                <>
                  <Navbar admin />
                  <AdminLogin />
                </>
              )
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <StatsSection />
                <TestimonialsSection />
                <LatestBlog />
                <ContactSection />
                <CallToAction />
                {/* <PartnersSection /> */}
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Navbar blog />
                <BlogList />
                <Footer />
              </>
            }
          />
          <Route
            path="/testimonials"
            element={
              <>
                <Navbar />
                <TestimonialList />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;