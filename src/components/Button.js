import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Button.module.scss';
import { Link } from 'react-router-dom';

const buttonTypes = {
  normal: 'normal',
  icon: 'icon',
  link: 'link',
};

const Button = forwardRef(({ children, onClick, type, ...rest }, ref) => {
  const buttonType = buttonTypes[type];
  const Component = buttonType === buttonTypes.link ? Link : 'button';

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={`${styles.button} ${styles[buttonType]}`}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([buttonTypes.normal, buttonTypes.icon, buttonTypes.link]),
};

Button.defaultProps = {
  onClick: null,
  type: buttonTypes.normal,
};

export default Button;
