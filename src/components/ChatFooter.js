import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatFooter.module.scss';
import { emitMessageSend, emitIsTyping } from '../api/events';

const isEmpty = (value) => value.length === 0;

const resetTextareaHeight = (current) => {
  if (current) current.style.height = '32px';
};

const updateTextareaHeight = (current) => {
  if (!current) return;

  resetTextareaHeight();
  const BORDER_BOTTOM = 7;
  current.style.height = `${current.scrollHeight + BORDER_BOTTOM}px`;
};

const ChatFooter = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.focus();
    updateTextareaHeight(messageRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage.trim())) {
      emitMessageSend(currentMessage);
      resetTextareaHeight(messageRef.current);
      setCurrentMessage('');
      e.target.focus();
    }
  };

  const handleMessageChange = (e) => {
    emitIsTyping();
    setCurrentMessage(e.target.value);
    updateTextareaHeight(messageRef.current);
  };

  const handleEnter = (e) => {
    const ENTER_KEY = 'Enter';

    if (e.shiftKey && e.key === ENTER_KEY) return e.preventDefault();

    if (e.key === ENTER_KEY) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <textarea
        onKeyPress={handleEnter}
        onChange={handleMessageChange}
        value={currentMessage}
        placeholder="Napisz wiadomosc..."
        ref={messageRef}
        className={styles.textarea}
      />
    </form>
  );
};

export default ChatFooter;
