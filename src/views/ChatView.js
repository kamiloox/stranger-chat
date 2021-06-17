import React, { useEffect, useState } from 'react';
import styles from '../styles/ChatView.module.scss';
import {
  onStrangerFound,
  onWarning,
  onMessage,
  onIsTyping,
  onLeaveChat,
  onAskQuestion,
  emitLeaveChat,
  emitStopMatch,
  emitMatch,
  offStrangerFound,
  offLeaveChat,
  offIsTyping,
  offMessage,
  offAskQuestion,
} from '../api/events';
import { UserProvider } from '../context/UserContext';
import ChatFooter from '../components/ChatFooter';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';
import Button from '../components/Button';

const ChatView = () => {
  const [stranger, setStranger] = useState(null);
  const [messages, setMessages] = useState([]);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const startSearching = () => {
    setMessages([]);
    setIsSearching(true);
    emitMatch();
  };

  useEffect(() => {
    startSearching();

    onWarning((data) => console.log(data));

    onStrangerFound((data) => {
      if (!data) return;

      setStranger(data);
      setIsSearching(false);
    });

    onMessage((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(newMessage);
    });

    onLeaveChat(() => {
      setStranger(null);
    });

    onAskQuestion((question) => {
      setAskedQuestions((prevAskedQuestions) => [...prevAskedQuestions, question]);
      setMessages((prevMessages) => [...prevMessages, question]);
    });

    let typingTimeout;
    onIsTyping(() => {
      setIsTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => setIsTyping(false), 1500);
    });

    return () => {
      offIsTyping();
      offMessage();
      offLeaveChat();
      offStrangerFound();
      offAskQuestion();
      emitLeaveChat();
    };
  }, []);

  const stopSearching = () => {
    emitStopMatch();
    setIsSearching(false);
  };

  return (
    <UserProvider>
      <div className={styles.wrapper}>
        <ChatHeader isDisabled={stranger === null} isSearching={isSearching} />
        <ChatContent
          messages={messages}
          stranger={stranger}
          isTyping={isTyping}
          isSearching={isSearching}
        >
          <Button onClick={() => (isSearching ? stopSearching() : startSearching())}>
            {isSearching ? 'Przestań szukać' : 'Znajdź nowego rozmówcę'}
          </Button>
        </ChatContent>
        <ChatFooter isDisabled={stranger === null} askedQuestions={askedQuestions} />
      </div>
    </UserProvider>
  );
};

export default ChatView;
