import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/IconButton.module.scss';

const IconButton = ({ children }) => <button className={styles.button}>{children}</button>;

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default IconButton;
