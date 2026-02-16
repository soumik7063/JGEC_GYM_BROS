import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('gym-bros-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme class to document root
    const root = document.documentElement;
    console.log('Theme changed to:', theme);
    console.log('Root element classes before:', root.className);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    console.log('Root element classes after:', root.className);
    
    // Save theme to localStorage
    localStorage.setItem('gym-bros-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle theme clicked!');
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Switching from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
