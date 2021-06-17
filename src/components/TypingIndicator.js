import React from 'react';
import styles from '../styles/TypingIndicator.module.scss';

const TypingIndicator = ({ visible }) => (
  <div className={`${styles.wrapper} ${visible ? styles.visible : ''}`}>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
  </div>
);

export default TypingIndicator;
