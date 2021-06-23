import React, { useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatContent.module.scss';
import { useUser } from '../context/UserContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import Loader from './Loader';
import { emitterTemplate } from '../helpers/emitterTemplate';
import KeywordList from './KeywordsList';

const Wrapper = forwardRef(({ children }, ref) => (
  <div className={styles.messagesWrapper} ref={ref}>
    <div className={styles.fixScroll}></div>
    {children}
  </div>
));

const ChatContent = ({ messages, stranger, isTyping, isSearching, children }) => {
  const { userId } = useUser();
  const wrapperRef = useRef();

  useEffect(() => {
    const { current } = wrapperRef;
    const lastMessage = messages[messages.length - 1];

    const SCROLL_TOLERANCE = 500;
    const totalContentHeight = current.scrollHeight;
    const scrollPosition = current.scrollTop + current.offsetHeight;

    let isScrolledToBottom = false;

    if (totalContentHeight - scrollPosition < SCROLL_TOLERANCE) {
      isScrolledToBottom = true;
    }

    const isSender = lastMessage?.initializer === userId;
    const isGif = lastMessage?.tail?.type === emitterTemplate.gif;
    // If (user is scrolled almost to bottom || (user sent a message and stranger is not typing || isGif))
    if (isScrolledToBottom || (isSender && !isTyping) || isGif) {
      current.scrollTop = current.scrollHeight; // Scroll to bottom
    }
  }, [messages, wrapperRef, userId, isTyping]);

  if (isSearching) {
    return (
      <Wrapper ref={wrapperRef}>
        <Loader visible={isSearching} centered />
        <div className={styles.children}>{children}</div>
      </Wrapper>
    );
  }

  if (stranger === null) {
    return (
      <Wrapper ref={wrapperRef}>
        <KeywordList />
        <ChatMessage received={true} date={Date.now()}>
          Zakończono rozmowę. Znajdź kogoś innego :)
        </ChatMessage>
        <div className={styles.children}>{children}</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={wrapperRef}>
      {messages.map(({ date, content, initializer, tail }) => (
        <ChatMessage received={initializer !== userId} key={date} date={date} tail={tail}>
          {content}
        </ChatMessage>
      ))}
      <TypingIndicator visible={isTyping} />
    </Wrapper>
  );
};

ChatContent.propTypes = {
  messages: PropTypes.array.isRequired,
  stranger: PropTypes.string,
  isTyping: PropTypes.bool,
  isSearching: PropTypes.bool,
  children: PropTypes.element,
};

ChatContent.defaultProps = {
  stranger: null,
  isTyping: false,
  isSearching: false,
  children: null,
};

export default ChatContent;
