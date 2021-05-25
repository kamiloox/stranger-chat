import React from 'react';
import styles from '../styles/ChatMessage.module.scss';
import PropTypes from 'prop-types';
import Paragraph from './Paragraph';

const ChatMessage = ({ children, received, date }) => (
  <div
    className={`${styles.wrapper} ${received ? styles.received : ''}`}
    title={new Date(date).toDateString()}
  >
    <Paragraph>{children}</Paragraph>
  </div>
);

ChatMessage.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  received: PropTypes.bool,
};

ChatMessage.defaultProps = {
  received: false,
};

export default ChatMessage;
