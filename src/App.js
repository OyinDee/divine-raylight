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
// import ContactSection from './components/ContactSection';
import BlogList from './components/BlogList';
import BlogAdmin from './components/BlogAdmin';
import AdminLogin from './components/AdminLogin';
import TestimonialList from './components/TestimonialList';
import TestimonialAdmin from './components/TestimonialAdmin';
import { auth } from './firebase';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => setAdmin(user));
    return unsub;
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <StatsSection />
                <TestimonialsSection />
                <BlogList />
                <TestimonialList />
                <CallToAction />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              admin ? (
                <>
                  <BlogAdmin />
                  <TestimonialAdmin />
                </>
              ) : (
                <AdminLogin />
              )
            }
          />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/testimonials" element={<TestimonialList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;