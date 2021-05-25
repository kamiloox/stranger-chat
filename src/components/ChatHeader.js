import React from 'react';
import styles from '../styles/ChatHeader.module.scss';
import exitIcon from '../assets/exitIcon.svg';
import PropTypes from 'prop-types';
import { emitLeaveChat } from '../api/events';
import Paragraph from './Paragraph';

const ChatHeader = ({ stranger }) => (
  <header className={styles.wrapper}>
    <input
      type="image"
      src={exitIcon}
      alt="Wyjdź z czatu"
      className={styles.icon}
      onClick={() => emitLeaveChat(stranger)}
    />
    <Paragraph>Nieznajomy</Paragraph>
  </header>
);

ChatHeader.propTypes = {
  stranger: PropTypes.string.isRequired,
};

export default ChatHeader;
