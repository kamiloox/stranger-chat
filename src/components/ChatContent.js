import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatContent.module.scss';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import Loader from './Loader';

const isEmpty = (value) => value.length === 0;

const ChatContent = forwardRef(
  ({ messages, stranger, isTyping, isSearching, children, didUserLeave }, ref) => {
    useEffect(() => {
      const { current } = ref;
      const isScrolledToBottom =
        current.scrollHeight - (current.scrollTop + current.getBoundingClientRect().height) < 100;

      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.initializer !== stranger || isScrolledToBottom || didUserLeave)
        current.scrollTop = current.scrollHeight;
    }, [messages, ref, stranger, didUserLeave]);

    const renderedMessages = messages.map(({ date, content, initializer }) => (
      <ChatMessage received={initializer === stranger} key={date} date={date}>
        {content}
      </ChatMessage>
    ));

    const searching = isEmpty(messages) && isSearching && (
      <div className={styles.loader}>
        <Loader />
      </div>
    );

    return (
      <div className={styles.messagesWrapper} ref={ref}>
        <div className={styles.fixScroll}></div>
        {searching}
        {!isSearching && renderedMessages}
        {isTyping && <TypingIndicator />}
        {didUserLeave && (
          <>
            <ChatMessage received={true} date={Date.now()}>
              Zakończono rozmowę
            </ChatMessage>
            <div className={styles.children}>{children}</div>
          </>
        )}
      </div>
    );
  }
);

ChatContent.propTypes = {
  messages: PropTypes.array.isRequired,
  stranger: PropTypes.string,
  isTyping: PropTypes.bool,
  isSearching: PropTypes.bool,
  children: PropTypes.element,
  didUserLeave: PropTypes.bool,
};

ChatContent.defaultProps = {
  stranger: null,
  isTyping: false,
  isSearching: false,
  didUserLeave: false,
  children: null,
};

export default ChatContent;
