import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (path: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpen(false);
    
    // Use navigate for all paths
    navigate(path);
    
    // For non-hash links, scroll to top after navigation
    if (!path.includes('#')) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const isActiveSection = (path: string) => {
    if (path.includes('#')) {
      const sectionId = path.split('#')[1];
      return location.pathname === '/' && location.hash === `#${sectionId}`;
    } else {
      return location.pathname === path;
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/shop', label: 'Shop' },
    { path: '/#about', label: 'About' },
    { path: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 group cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 69, 0, 0.4))',
                animation: 'pulse 1.5s infinite'
              }}
            >
              <Flame className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors ember-glow" />
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text">
                ExtraCrispE Pyrographics
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={`relative text-sm font-medium transition-colors hover:text-orange-400 ${
                    isActiveSection(item.path)
                      ? 'text-orange-500'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                  {isActiveSection(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-orange-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden"
            style={{ paddingTop: '80px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavClick(item.path, e)}
                    className={`text-2xl font-medium transition-colors hover:text-orange-400 ${
                      isActiveSection(item.path)
                        ? 'text-orange-500'
                        : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;