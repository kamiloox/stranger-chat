import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import {
  emitEnterQueue,
  emitMatch,
  onStrangerFound,
  offStrangerFound,
  emitLeaveQueue,
} from './api/events';

const App = () => {
  const [stranger, setStranger] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  let matchInterval;
  useEffect(() => {
    onStrangerFound((data) => {
      if (!data) return;

      setStranger(data);
      setIsSearching(false);
    });

    return () => {
      offStrangerFound();
    };
  }, [setStranger]);

  const handleEnterQueue = () => {
    setIsSearching(true);
    emitEnterQueue();
    matchInterval = setInterval(() => {
      emitMatch();
    }, 1000);
  };

  const handleLeaveQueue = () => {
    clearInterval(matchInterval);
    emitLeaveQueue();
    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <>
        <p>Searching...</p>
        <button onClick={handleLeaveQueue}>Stop searching</button>
      </>
    );
  }

  if (!stranger) return <button onClick={handleEnterQueue}>Find stranger</button>;

  return <Chat stranger={stranger} setStranger={setStranger} />;
};

export default App;
