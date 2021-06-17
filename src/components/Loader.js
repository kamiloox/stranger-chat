import React from 'react';
import styles from '../styles/Loader.module.scss';

const Loader = ({ centered }) => (
  <div className={centered && styles.centered}>
    <span className={styles.loader}></span>
  </div>
);

export default Loader;
