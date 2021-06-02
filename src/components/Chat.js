import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  onMessageReceived,
  onIsTyping,
  offLeaveChat,
  offIsTyping,
  onLeaveChat,
  offMessageReceived,
} from '../api/events';
import styles from '../styles/Chat.module.scss';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import TypingIndicator from './TypingIndicator';

const Chat = ({ stranger, setStranger }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    onMessageReceived((newMessage) => {
      console.log(newMessage);
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const { current } = messagesRef;
      const isScrolledToBottom =
        current.scrollHeight - (current.scrollTop + current.getBoundingClientRect().height) < 100;
      if (newMessage.initializer !== stranger || isScrolledToBottom)
        current.scrollTop = current.scrollHeight;
    });

    onLeaveChat(() => setStranger(null));

    let typingTimeout;
    onIsTyping(() => {
      setIsTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => setIsTyping(false), 1500);
    });

    return () => {
      offIsTyping();
      offMessageReceived();
      offLeaveChat();
    };
  }, [setMessages, setStranger, stranger]);

  return (
    <div className={styles.wrapper}>
      <ChatHeader stranger={stranger} />
      <div className={styles.messagesWrapper} ref={messagesRef}>
        <div className={styles.fix}></div>
        {messages.map(({ date, content, initializer, detected }) => (
          <ChatMessage
            received={initializer === stranger}
            key={date}
            date={date}
            detected={detected}
          >
            {content}
          </ChatMessage>
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <ChatFooter />
    </div>
  );
};

Chat.propTypes = {
  stranger: PropTypes.string.isRequired,
  setStranger: PropTypes.func.isRequired,
};

export default Chat;
