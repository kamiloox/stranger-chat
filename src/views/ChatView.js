import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import Button from '../components/Button';
import {
  emitMatch,
  onStrangerFound,
  offStrangerFound,
  emitStopMatch,
  onWarning,
} from '../api/events';

const ChatView = () => {
  const [stranger, setStranger] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleMatch = () => {
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

    return () => {
      offStrangerFound();
    };
  }, [setStranger]);

  const handleStopMatch = () => {
    clearInterval(matchInterval);
    emitStopMatch();
    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <>
        <p>Szukam...</p>
        <Button onClick={handleStopMatch}>Przestań szukać</Button>
      </>
    );
  }

  if (!stranger) return <Button onClick={handleMatch}>Znajdź rozmówcę</Button>;

  return <Chat stranger={stranger} setStranger={setStranger} />;
};

export default ChatView;
