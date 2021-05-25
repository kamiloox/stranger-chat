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

const Chat = ({ stranger, setStranger }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    onMessageReceived((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Scroll to last message
      messagesRef.current
        .querySelector('div[title]:last-child')
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
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
  }, [setMessages, setStranger]);

  return (
    <div className={styles.wrapper}>
      <ChatHeader stranger={stranger} />
      <div className={styles.messagesWrapper} ref={messagesRef}>
        {messages.map(({ date, content, author }) => (
          <ChatMessage received={author === stranger} key={date} date={date}>
            {content}
          </ChatMessage>
        ))}
      </div>
      {isTyping && <span>typing...</span>}
      <ChatFooter />
    </div>
  );
};

Chat.propTypes = {
  stranger: PropTypes.string.isRequired,
  setStranger: PropTypes.func.isRequired,
};

export default Chat;
