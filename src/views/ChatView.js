import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/ChatView.module.scss';
import {
  emitMatch,
  onStrangerFound,
  offStrangerFound,
  emitStopMatch,
  onWarning,
  onMessageReceived,
  onIsTyping,
  offLeaveChat,
  offIsTyping,
  onLeaveChat,
  offMessageReceived,
  emitLeaveChat,
} from '../api/events';
import ChatFooter from '../components/ChatFooter';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';
import Button from '../components/Button';

const ChatView = () => {
  const [stranger, setStranger] = useState(null);
  const [messages, setMessages] = useState([]);
  const [didUserLeave, setDidUserLeave] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const chatContentRef = useRef(null);

  const handleMatch = () => {
    setMessages([]);
    setStranger(null);
    setDidUserLeave(false);
    setIsSearching(true);
    emitMatch();
  };

  let matchInterval;
  useEffect(() => {
    handleMatch();

    onWarning((data) => console.log(data));

    onStrangerFound((data) => {
      if (!data) return;

      setStranger(data);
      setIsSearching(false);
    });

    onMessageReceived((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    onLeaveChat(() => {
      setDidUserLeave(true);
    });

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
      offStrangerFound();
      emitLeaveChat();
    };
  }, [setStranger, setMessages]);

  const handleStopMatch = () => {
    clearInterval(matchInterval);
    emitStopMatch();
    setIsSearching(false);
  };

  return (
    <div className={styles.wrapper}>
      <ChatHeader
        isDisabled={stranger === null || didUserLeave}
        isSearching={isSearching}
        handleStopMatch={handleStopMatch}
      />
      <ChatContent
        messages={messages}
        stranger={stranger}
        isTyping={isTyping}
        isSearching={isSearching}
        didUserLeave={didUserLeave}
        ref={chatContentRef}
      >
        <Button onClick={() => (isSearching ? handleStopMatch() : handleMatch())}>
          {isSearching ? 'Przestań szukać' : 'Znajdź nowego rozmówcę'}
        </Button>
      </ChatContent>
      <ChatFooter isDisabled={stranger === null || didUserLeave} />
    </div>
  );
};

export default ChatView;
