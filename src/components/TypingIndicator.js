import React from 'react';
import styles from '../styles/TypingIndicator.module.scss';

const TypingIndicator = () => (
  <div className={styles.wrapper}>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
  </div>
);

export default TypingIndicator;
