import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  onMessageReceived,
  emitMessageSend,
  onIsTyping,
  emitIsTyping,
  emitLeaveChat,
  offLeaveChat,
  offIsTyping,
  onLeaveChat,
  offMessageReceived,
} from '../api/events';
import Message from './ChatMessage';

const isEmpty = (value) => value.length === 0;

const Chat = ({ stranger, setStranger }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    onMessageReceived((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      emitMessageSend(currentMessage);
      setCurrentMessage('');
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    emitIsTyping();
    setCurrentMessage(e.target.value);
  };

  return (
    <>
      <button onClick={() => emitLeaveChat(stranger)}>Leave chat</button>
      <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
        <div style={{ flexGrow: '1', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {messages.map(({ date, content, receiver }) => (
            <Message received={receiver === stranger} key={date}>
              {content}
            </Message>
          ))}
        </div>
        {isTyping && <span>typing...</span>}
        <form onSubmit={handleSubmit}>
          <input onChange={handleInputChange} value={currentMessage} ref={inputRef} />
          <button type="submit">&rarr;</button>
        </form>
      </div>
    </>
  );
};

Chat.propTypes = {
  stranger: PropTypes.string,
  setStranger: PropTypes.func.isRequired,
};

Chat.defaultProps = {
  stranger: null,
};

export default Chat;
