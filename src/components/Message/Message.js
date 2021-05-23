import React from 'react';
import styles from './Message.module.scss';
import PropTypes from 'prop-types';
import Paragraph from '../Paragraph/Paragraph';

const Message = ({ children, received, date }) => (
  <div
    className={`${styles.wrapper} ${received ? styles.received : ''}`}
    title={new Date(date).toDateString()}
  >
    <Paragraph>{children}</Paragraph>
  </div>
);

Message.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  received: PropTypes.bool,
};

Message.defaultProps = {
  received: false,
};

export default Message;
