import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  onMessageReceived,
  onIsTyping,
  offLeaveChat,
  offIsTyping,
  onLeaveChat,
  offMessageReceived,
  emitLeaveChat,
} from '../api/events';
import { ReactComponent as ExitIcon } from '../assets/exitIcon.svg';
import styles from '../styles/Chat.module.scss';
import ChatMessage from './ChatMessage';
import ChatFooter from './ChatFooter';
import TypingIndicator from './TypingIndicator';
import Paragraph from './Paragraph';
import Button from './Button';

const Chat = ({ stranger, setStranger }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesWrapperRef = useRef(null);

  useEffect(() => {
    onMessageReceived((newMessage) => {
      console.log(newMessage);
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const { current } = messagesWrapperRef;
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
      emitLeaveChat(stranger);
      offIsTyping();
      offMessageReceived();
      offLeaveChat();
    };
  }, [setMessages, setStranger, stranger]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button type="icon" onClick={() => emitLeaveChat(stranger)}>
          <ExitIcon />
        </Button>
        <Paragraph>Nieznajomy</Paragraph>
      </div>
      <div className={styles.messagesWrapper} ref={messagesWrapperRef}>
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
