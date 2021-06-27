import React from 'react';
import styles from '../styles/MainTemplate.module.scss';
import Navigation from '../components/Navigation';

const MainTemplate = ({ children }) => (
  <>
    <div className={styles.wrapper}>
      <Navigation />
      {children}
    </div>
  </>
);

export default MainTemplate;
