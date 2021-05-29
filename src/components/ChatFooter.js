import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatFooter.module.scss';
import { emitMessageSend, emitIsTyping } from '../api/events';
import { ReactComponent as ArrowIcon } from '../assets/arrowIcon.svg';
import { ReactComponent as EmojiIcon } from '../assets/emojiIcon.svg';
import { ReactComponent as GifIcon } from '../assets/gifIcon.svg';
import { ReactComponent as SendIcon } from '../assets/sendIcon.svg';
import IconButton from './IconButton';

const isEmpty = (value) => value.length === 0;

const resetTextareaHeight = (current) => {
  if (current) current.style.height = '32px';
};

const updateTextareaHeight = (current) => {
  if (!current) return;

  resetTextareaHeight(current);

  const BORDER_BOTTOM = 7;
  const newHeight = current.scrollHeight + BORDER_BOTTOM;
  current.style.height = `${newHeight}px`;
};

const ChatFooter = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messageRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    messageRef.current.focus();
    [...wrapperRef.current.querySelectorAll('button')].forEach((button) => {
      button.addEventListener('click', () => messageRef.current.focus());
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      emitMessageSend(currentMessage);
      resetTextareaHeight(messageRef.current);
      setIsExpanded(false);
      setCurrentMessage('');
      e.target.focus();
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    updateTextareaHeight(messageRef.current);
    emitIsTyping();
    setCurrentMessage(value);
  };

  const handleEnter = (e) => {
    const ENTER_KEY = 'Enter';

    if (e.shiftKey && e.key === ENTER_KEY) return;

    if (e.key === ENTER_KEY) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      onSubmit={handleSubmit}
      className={`${styles.wrapper} ${isExpanded ? styles.expanded : ''}`}
      ref={wrapperRef}
    >
      <IconButton>
        <ArrowIcon className={styles.icon} onClick={() => setIsExpanded(false)} />
      </IconButton>
      <div className={styles.actionButtons}>
        <IconButton>
          <EmojiIcon className={styles.icon} />
        </IconButton>
        <IconButton>
          <GifIcon className={styles.icon} />
        </IconButton>
      </div>
      <textarea
        onKeyDown={handleEnter}
        onInput={() => updateTextareaHeight(messageRef.current)}
        onChange={handleMessageChange}
        value={currentMessage}
        autoComplete="off"
        placeholder="Napisz wiadomosc..."
        ref={messageRef}
        className={styles.textarea}
      />
      <IconButton>
        <SendIcon className={styles.icon} onClick={handleSubmit} />
      </IconButton>
    </div>
  );
};

export default ChatFooter;
