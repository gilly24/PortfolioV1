import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks'; // Assuming this file exists for social links
import Button from './Button'; // Assuming this is for the theme toggle button

const Navbar = ({ activeSection, scrollToSection, toggleTheme, theme }) => {
  const menuItems = ['Hero', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: theme.cardBackground,
        borderRadius: '50px',
        padding: '0.5rem 2rem',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'fit-content',
      }}
    >
      {/* Navigation Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.toLowerCase())}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeSection === item.toLowerCase() ? theme.buttonText : theme.textColor,
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = theme.buttonText)}
            onMouseLeave={(e) =>
              (e.target.style.color =
                activeSection === item.toLowerCase() ? theme.buttonText : theme.textColor)
            }
          >
            {item}
          </button>
        ))}
      </div>

      {/* Social Links */}
      <SocialLinks theme={theme} />

      {/* Theme Toggle Button */}
      <motion.div whileHover={{ scale: 1.1 }} style={{ marginLeft: '1rem' }}>
        <Button toggleTheme={toggleTheme} theme={theme} />
      </motion.div>
    </nav>
  );
};

export default Navbar;
