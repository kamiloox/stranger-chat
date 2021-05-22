import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  onMessageReceived,
  emitMessageSend,
  onIsTyping,
  emitIsTyping,
  offIsTyping,
  offMessageReceived,
} from '../api/events';
import Message from './Message';

const isEmpty = (value) => value.length === 0;

const Chat = ({ stranger }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    onMessageReceived((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    onIsTyping(() => setIsTyping(true));

    return () => {
      offIsTyping();
      offMessageReceived();
    };
  }, [setMessages]);

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div style={{ flexGrow: '1', height: '100%' }}>
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
  );
};

Chat.propTypes = {
  stranger: PropTypes.string,
};

Chat.defaultProps = {
  stranger: null,
};

export default Chat;
