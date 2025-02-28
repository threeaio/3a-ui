'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';

type Theme = 'system' | 'light' | 'dark';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from localStorage or default to system
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      // Check if user has dark mode preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('system');
        applyTheme('system');
      }
    }

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Remove existing theme class
    root.classList.remove('dark');

    // Apply new theme
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    }

    // Store theme preference
    if (newTheme !== 'system') {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.setItem('theme', 'system');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <fieldset className="flex items-center border border-border rounded-full p-1 bg-card">
      <legend className="sr-only">Select a display theme:</legend>

      {/* System Theme */}
      <span className="h-full">
        <input
          aria-label="system"
          id="theme-switch-system"
          type="radio"
          value="system"
          checked={theme === 'system'}
          onChange={() => handleThemeChange('system')}
          className="sr-only"
        />
        <label
          htmlFor="theme-switch-system"
          className={`flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-accent ${
            theme === 'system' ? 'bg-secondary' : ''
          }`}
        >
          <span className="sr-only">system</span>
          <Monitor size={16} className="text-foreground" />
        </label>
      </span>

      {/* Light Theme */}
      <span className="h-full">
        <input
          aria-label="light"
          id="theme-switch-light"
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={() => handleThemeChange('light')}
          className="sr-only"
        />
        <label
          htmlFor="theme-switch-light"
          className={`flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-accent ${
            theme === 'light' ? 'bg-secondary' : ''
          }`}
        >
          <span className="sr-only">light</span>
          <Sun size={16} className="text-foreground" />
        </label>
      </span>

      {/* Dark Theme */}
      <span className="h-full">
        <input
          aria-label="dark"
          id="theme-switch-dark"
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => handleThemeChange('dark')}
          className="sr-only"
        />
        <label
          htmlFor="theme-switch-dark"
          className={`flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-accent ${
            theme === 'dark' ? 'bg-secondary' : ''
          }`}
        >
          <span className="sr-only">dark</span>
          <Moon size={16} className="text-foreground" />
        </label>
      </span>
    </fieldset>
  );
};

export default ThemeSwitcher;
