import React, { useState, useEffect } from 'react';
import styles from '../styles/ThemeToggle.module.scss';
import { ReactComponent as MoonIcon } from '../assets/moonIcon.svg';
import { ReactComponent as SunIcon } from '../assets/sunIcon.svg';

const themes = {
  light: 'light',
  dark: 'dark',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) return setTheme(savedTheme);

    const isDarkPrefered =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkPrefered) return setTheme(themes.dark);
    setTheme(themes.light);
  }, []);

  const setThemePersistent = (selectedTheme) => {
    setTheme(selectedTheme);
    window.localStorage.setItem('theme', selectedTheme);
  };

  useEffect(() => {
    const rootElement = document.querySelector('html');
    rootElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    if (theme === themes.light) return setThemePersistent(themes.dark);
    setThemePersistent(themes.light);
  };

  return (
    <>
      <input
        id="theme-toggle"
        type="checkbox"
        className={styles.checkbox}
        onChange={handleToggleTheme}
      />
      <label htmlFor="theme-toggle" className={styles.slider}>
        <SunIcon />
        <MoonIcon />
      </label>
    </>
  );
};

export default ThemeToggle;
