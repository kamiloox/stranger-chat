import React from 'react';
import styles from '../styles/MainTemplate.module.scss';

const MainTemplate = ({ children }) => <div className={styles.wrapper}>{children}</div>;

export default MainTemplate;
