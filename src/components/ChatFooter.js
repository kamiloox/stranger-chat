import React, { useState, useRef, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatFooter.module.scss';
import { emitMessageSend, emitIsTyping } from '../api/events';
import { ReactComponent as ArrowIcon } from '../assets/arrowIcon.svg';
import { ReactComponent as EmojiIcon } from '../assets/emojiIcon.svg';
import { ReactComponent as GifIcon } from '../assets/gifIcon.svg';
import { ReactComponent as SendIcon } from '../assets/sendIcon.svg';
import Button from './Button';
import Giphy from './Giphy';
import TextInput from './TextInput';

const isEmpty = (value) => value.length === 0;

const ChatFooter = ({ isDisabled }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [giphy, setGiphy] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = createRef(null);

  useEffect(() => {
    if (isDisabled) {
      setCurrentMessage('');
      setIsExpanded(false);
    }
  }, [isDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      emitMessageSend(currentMessage);
      setIsExpanded(false);
      setGiphy({ ...giphy, visible: false });
      setCurrentMessage('');
      e.target.focus();
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    if (giphy?.visible) return setCurrentMessage(value);

    if (value.length === 0) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    emitIsTyping();
    setCurrentMessage(value);
  };

  if (giphy?.visible) {
    return (
      <div className={`${styles.wrapper} ${styles.actionWrapper}`}>
        <Giphy padding={20} setIsVisible={setGiphy} type={giphy.type} />
      </div>
    );
  }

  return (
    <div
      className={`
        ${styles.wrapper} 
        ${isExpanded ? styles.expanded : ''} 
        ${isDisabled ? styles.disabled : ''}`}
      ref={wrapperRef}
    >
      <Button type="icon" onClick={() => setIsExpanded(false)}>
        <ArrowIcon />
      </Button>
      <div className={styles.actionButtons}>
        <Button type="icon" onClick={() => setGiphy({ visible: true, type: 'animatedText' })}>
          <EmojiIcon />
        </Button>
        <Button type="icon" onClick={() => setGiphy({ visible: true, type: 'gif' })}>
          <GifIcon />
        </Button>
      </div>
      <TextInput
        onSubmit={handleSubmit}
        onChange={handleMessageChange}
        value={currentMessage}
        placeholder="Napisz wiadomość..."
        autoCorrect="off"
        disabled={isDisabled}
        ref={inputRef}
      />
      <Button type="icon" onClick={handleSubmit}>
        <SendIcon className={styles.icon} />
      </Button>
    </div>
  );
};

ChatFooter.propTypes = {
  isDisabled: PropTypes.bool,
};

ChatFooter.defaultProps = {
  isDisabled: false,
};

export default ChatFooter;
