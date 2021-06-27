import React, { useEffect, useState, useRef } from 'react';
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
import { useChatKeywords } from '../context/ChatContext';
import { useApp } from '../context/AppContext';
import { emitterTemplate, emitterType } from '../helpers/emitterTemplate';
import MainTemplate from '../templates/MainTemplate';
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
  const { userId } = useApp();
  const { keywords } = useChatKeywords();
  const refMatchInterval = useRef(0);

  const startSearching = () => {
    setMessages([]);
    setIsSearching(true);
    refMatchInterval.current = setInterval(() => emitMatch(keywords), 500);
  };

  useEffect(() => {
    if (!userId) return;

    onWarning((data) => console.log(data));

    onStrangerFound((data) => {
      if (!data) return;

      const { id, keywords } = data;
      const welcomeMsg = 'Przywitaj się z nieznajomym.\n';
      const keywordsMsg = keywords.length ? `Wspólne słowa kluczowe: ${keywords.join(', ')}` : '';
      if (data.keywords) setMessages([emitterTemplate(welcomeMsg + keywordsMsg, emitterType.info)]);

      clearInterval(refMatchInterval.current);
      setStranger(id);
      setIsSearching(false);
    });

    onMessage((newMessage) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    onLeaveChat(() => {
      setStranger(null);
      // Removes welcome message
      setMessages((prevMessages) => prevMessages.slice(1));
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
  }, [userId]);

  const stopSearching = () => {
    emitStopMatch();
    setIsSearching(false);
  };

  return (
    <MainTemplate>
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
    </MainTemplate>
  );
};

export default ChatView;
