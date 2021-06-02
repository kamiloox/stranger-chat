import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/IconButton.module.scss';

const IconButton = ({ children, onClick }) => (
  <button onClick={onClick} className={styles.button}>
    {children}
  </button>
);

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default IconButton;
