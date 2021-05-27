import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import { emitMatch, onStrangerFound, offStrangerFound, emitStopMatch } from './api/events';

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

  const handleMatch = () => {
    setIsSearching(true);
    emitMatch();
  };

  const handleStopMatch = () => {
    clearInterval(matchInterval);
    emitStopMatch();
    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <>
        <p>Searching...</p>
        <button onClick={handleStopMatch}>Stop searching</button>
      </>
    );
  }

  if (!stranger) return <button onClick={handleMatch}>Find stranger</button>;

  return <Chat stranger={stranger} setStranger={setStranger} />;
};

export default App;
