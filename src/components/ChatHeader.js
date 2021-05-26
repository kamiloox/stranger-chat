import React from 'react';
import styles from '../styles/ChatHeader.module.scss';
import { ReactComponent as ExitIcon } from '../assets/exitIcon.svg';
import PropTypes from 'prop-types';
import { emitLeaveChat } from '../api/events';
import Paragraph from './Paragraph';

const ChatHeader = ({ stranger }) => (
  <header className={styles.wrapper}>
    <button onClick={() => emitLeaveChat(stranger)} className={styles.button}>
      <ExitIcon className={styles.icon} />
    </button>
    <Paragraph>Nieznajomy</Paragraph>
  </header>
);

ChatHeader.propTypes = {
  stranger: PropTypes.string.isRequired,
};

export default ChatHeader;
