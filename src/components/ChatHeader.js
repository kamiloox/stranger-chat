import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatHeader.module.scss';
import { emitLeaveChat } from '../api/events';
import { ReactComponent as ExitIcon } from '../assets/exitIcon.svg';
import Paragraph from './Paragraph';
import Button from './Button';

const ChatHeader = ({ isDisabled, isSearching, handleStopMatch }) => (
  <div className={`${styles.header} ${isDisabled ? styles.disabled : ''}`}>
    <Button type="icon" onClick={() => (isSearching ? handleStopMatch() : emitLeaveChat())}>
      <ExitIcon />
    </Button>
    <Paragraph>{isSearching ? 'Szukam rozmówcy' : 'Nieznajomy'}</Paragraph>
  </div>
);

ChatHeader.propTypes = {
  isDisabled: PropTypes.bool,
  isSearching: PropTypes.bool,
  handleStopMatch: PropTypes.func.isRequired,
};

ChatHeader.defaultProps = {
  isDisabled: false,
  isSearching: false,
};

export default ChatHeader;
