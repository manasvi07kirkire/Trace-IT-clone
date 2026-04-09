"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['home', 'features', 'how-it-works', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Check authentication status
    const authStatus = localStorage.getItem('traceit_admin_auth') === 'true';
    setIsAuthenticated(authStatus);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      window.location.href = '/admin';
    } else {
      window.location.href = '/admin/login';
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
     { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10",
        scrolled && "shadow-lg"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">TraceIT</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "text-white/80 hover:text-white transition-colors duration-200 font-medium",
                  activeSection === link.id && "text-cyan-400"
                )}
              >
                {link.label}
              </button>
            ))}
            
            {/* Admin Button */}
            <button
              onClick={handleAdminClick}
              className="flex items-center space-x-2 px-3 py-2 text-white/60 hover:text-white transition-colors duration-200 font-medium border border-white/20 rounded-lg"
            >
              <Lock className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "block w-full text-left text-white/80 hover:text-white transition-colors duration-200 font-medium py-2",
                    activeSection === link.id && "text-cyan-400"
                  )}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-white/10">
                <button className="w-full px-4 py-2 text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center justify-center">
                  Contact
                </button>
                
                {/* Admin Button - Mobile */}
                <button
                  onClick={handleAdminClick}
                  className="w-full px-4 py-2 text-white/60 hover:text-white transition-colors duration-200 font-medium flex items-center justify-center border border-white/20 rounded-lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Admin
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
