import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss';
import routes from '../routes';
import Button from './Button';
import CheckboxSwitch from '../components/ThemeToggle';
import { ReactComponent as DiceIcon } from '../assets/diceIcon.svg';

const Navigation = () => {
  const [isVisibleOnMobile, setIsVisibleOnMobile] = useState(false);

  const toggleVisibility = () => setIsVisibleOnMobile(!isVisibleOnMobile);

  return (
    <>
      <button
        className={`${styles.hamburgerWrapper} ${isVisibleOnMobile ? styles.enabled : ''}`}
        onClick={toggleVisibility}
      >
        <span></span>
      </button>
      <nav className={`${styles.menuWrapper} ${isVisibleOnMobile ? styles.visibleOnMobile : ''}`}>
        <ul className={styles.navList}>
          <li>
            <Link to={routes.home} className={styles.logoLink}>
              <DiceIcon className={styles.icon} />
              <span className={styles.logoName}>trafczat</span>
            </Link>
          </li>
          <li className={styles.rightWrapper}>
            <Button btnType="link" to="/about">
              O nas
            </Button>
            <CheckboxSwitch />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
