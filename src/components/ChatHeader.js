import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatHeader.module.scss';
import { emitLeaveChat } from '../api/events';
import { ReactComponent as ExitIcon } from '../assets/exitIcon.svg';
import Paragraph from './Paragraph';
import Button from './Button';

const ChatHeader = ({ isDisabled, isSearching }) => (
  <div className={`${styles.header} ${isDisabled ? styles.disabled : ''}`}>
    <Button btnType="icon" onClick={emitLeaveChat}>
      <ExitIcon />
    </Button>
    <Paragraph>{isSearching ? 'Szukam rozmówcy' : 'Nieznajomy'}</Paragraph>
  </div>
);

ChatHeader.propTypes = {
  isDisabled: PropTypes.bool,
  isSearching: PropTypes.bool,
};

ChatHeader.defaultProps = {
  isDisabled: false,
  isSearching: false,
};

export default ChatHeader;
