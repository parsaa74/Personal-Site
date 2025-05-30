import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const routes = [
    { path: '/about', label: 'nav.about' },
    { path: '/projects', label: 'nav.projects' },
    { path: '/contact', label: 'nav.contact' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '20px',
      padding: '10px 20px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      {routes.map((route) => (
        <button
          key={route.path}
          onClick={() => navigate(route.path)}
          style={{
            padding: '8px 16px',
            background: location.pathname === route.path ? '#4444ff' : 'transparent',
            color: location.pathname === route.path ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          {t(route.label)}
        </button>
      ))}
    </nav>
  );
};

export default Navigation; 